import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'


describe('Meals routes', () => {
    let userCookie: string | undefined

    beforeAll(async () => {
    await app.ready()
    })

     afterAll(async () => {
    await app.close()
     })

    beforeEach(async () => {
    const response = await request(app.server)
        .post('/users')
        .send()

     const cookies =  response.get('Set-Cookie')
     userCookie = cookies?.[0]
    })

    it('should allow access to protected routes with a valid user', async () => {
        expect(userCookie).toBeDefined()

    const response = await request(app.server)
      .get('/me')
      .set('Cookie', userCookie!)

    expect(response.status).toBe(200)
    })


    it('should not be able to create a meal without authentication', async () => {
    const response = await request(app.server)
        .post('/meals')
        .send({
            name: 'Lunch',
            description: 'Chicken and rice',
            meal_date_time: '2024-01-01 12:00:00',
            is_on_diet: true,
        })

    expect(response.status).toBe(401)
    })

    it('should not be able to create a meal without authentication', async () => {
    const response = await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Lunch',
            description: 'Chicken and rice',
            meal_date_time: '2024-01-01 12:00:00',
            is_on_diet: true,
        })

    expect(response.status).toBe(201)
    })

    it('should list the created meal for the authenticated user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner',
                description: 'Salad',
                meal_date_time: '2024-01-01 19:00:00',
                is_on_diet: true,
            })

        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.meals).toHaveLength(1)
        expect(listResponse.body.meals[0].name).toBe('Dinner')
    })

    it('should not be able to list meals without authentication', async () => {
        const response = await request(app.server)
            .get('/meals')

        expect(response.status).toBe(401)
    })

    it('should list all meals of the authenticated user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Breakfast',
                description: 'Eggs',
                meal_date_time: '2024-01-01 08:00:00',
                is_on_diet: true,
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
            name: 'Lunch',
            description: 'Chicken',
            meal_date_time: '2024-01-01 12:00:00',
            is_on_diet: true,
        })

        const response = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body.meals).toHaveLength(2)
        expect(response.body.meals.map((m: { name: string })=> m.name)).toEqual(
            expect.arrayContaining(['Breakfast', 'Lunch'])
        )
    })

    it('should not list meals from another user', async () => {
        // cria refeição do usuário atual
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner',
                description: 'Salad',
                meal_date_time: '2024-01-01 19:00:00',
                is_on_diet: true,
        })

        // cria outro usuário
        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        // cria refeição do outro usuário
        await request(app.server)
            .post('/meals')
            .set('Cookie', otherUserCookie!)
            .send({
                name: 'Late Snack',
                description: 'Yogurt',
                meal_date_time: '2024-01-01 22:00:00',
                is_on_diet: true,
            })

        // lista refeições do usuário original
        const response = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body.meals).toHaveLength(1)
        expect(response.body.meals[0].name).toBe('Dinner')
    })

    it('should not be able to get a meal without authentication', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')

        expect(response.status).toBe(401)
    })
    
    it('should return 404 when trying to get a non-existing meal', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(404)
    })

    it('should not be able to get a meal from another user', async () => {
        // cria refeição do usuário atual
        const createResponse = await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Lunch',
                description: 'Chicken',
                meal_date_time: '2024-01-01 12:00:00',
                is_on_diet: true,
            })

        expect(createResponse.status).toBe(201)

        // captura id da refeição criada listando
        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        const mealId = listResponse.body.meals[0].id

        // cria outro usuário
        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        // tenta acessar a refeição com outro usuário
        const response = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', otherUserCookie!)

        expect(response.status).toBe(404)
    })

    it('should be able to get a specific meal of the authenticated user', async () => {
        // cria refeição
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner',
                description: 'Salad',
                meal_date_time: '2024-01-01 19:00:00',
                is_on_diet: true,
            })

        // lista para obter o id
        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        const mealId = listResponse.body.meals[0].id

        // busca por id
        const response = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body.meal).toEqual(
            expect.objectContaining({
            id: mealId,
            name: 'Dinner',
            })
        )
    })

})
 


