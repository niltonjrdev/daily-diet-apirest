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

        const cookies = response.get('Set-Cookie')
        userCookie = cookies?.[0]
    })

    it.skip('should allow access to protected routes with a valid user', async () => {
        expect(userCookie).toBeDefined()

        const response = await request(app.server)
            .get('/me')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
    })

    // ==================== CREATE ====================

    

    // ==================== LIST ====================

    it.skip('should not be able to list meals without authentication', async () => {
        const response = await request(app.server)
            .get('/meals')

        expect(response.status).toBe(401)
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

    it.skip('should list all meals of the authenticated user', async () => {
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
        expect(response.body.meals.map((m: { name: string }) => m.name)).toEqual(
            expect.arrayContaining(['Breakfast', 'Lunch'])
        )
    })

    it.skip('should not list meals from another user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner',
                description: 'Salad',
                meal_date_time: '2024-01-01 19:00:00',
                is_on_diet: true,
            })

        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        await request(app.server)
            .post('/meals')
            .set('Cookie', otherUserCookie!)
            .send({
                name: 'Late Snack',
                description: 'Yogurt',
                meal_date_time: '2024-01-01 22:00:00',
                is_on_diet: true,
            })

        const response = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body.meals).toHaveLength(1)
        expect(response.body.meals[0].name).toBe('Dinner')
    })

    // ==================== GET ONE ====================

    it.skip('should not be able to get a meal without authentication', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')

        expect(response.status).toBe(401)
    })

    it.skip('should return 404 when trying to get a non-existing meal', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(404)
    })

    it.skip('should not be able to get a meal from another user', async () => {
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

        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        const mealId = listResponse.body.meals[0].id

        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        const response = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', otherUserCookie!)

        expect(response.status).toBe(404)
    })

    it.skip('should be able to get a specific meal of the authenticated user', async () => {
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

        const mealId = listResponse.body.meals[0].id

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

    // ==================== UPDATE ====================

    it.skip('should not be able to update a meal without authentication', async () => {
        const response = await request(app.server)
            .put('/meals/00000000-0000-0000-0000-000000000000')
            .send({
                name: 'Updated',
                description: 'Updated',
                meal_date_time: '2024-01-02 12:00:00',
                is_on_diet: false,
            })

        expect(response.status).toBe(401)
    })

    it.skip('should return 404 when trying to update a non-existing meal', async () => {
        const response = await request(app.server)
            .put('/meals/00000000-0000-0000-0000-000000000000')
            .set('Cookie', userCookie!)
            .send({
                name: 'Updated',
                description: 'Updated',
                meal_date_time: '2024-01-02 12:00:00',
                is_on_diet: false,
            })

        expect(response.status).toBe(404)
    })

    it.skip('should not be able to update a meal from another user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Lunch',
                description: 'Chicken',
                meal_date_time: '2024-01-01 12:00:00',
                is_on_diet: true,
            })

        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        const mealId = listResponse.body.meals[0].id

        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        const response = await request(app.server)
            .put(`/meals/${mealId}`)
            .set('Cookie', otherUserCookie!)
            .send({
                name: 'Hacked',
                description: 'Hacked',
                meal_date_time: '2024-01-02 12:00:00',
                is_on_diet: false,
            })

        expect(response.status).toBe(404)
    })

    it.skip('should be able to update a meal of the authenticated user', async () => {
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

        const mealId = listResponse.body.meals[0].id

        const updateResponse = await request(app.server)
            .put(`/meals/${mealId}`)
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner Updated',
                description: 'Salad and soup',
                meal_date_time: '2024-01-02 20:00:00',
                is_on_diet: false,
            })

        expect(updateResponse.status).toBe(204)

        const getResponse = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', userCookie!)

        expect(getResponse.status).toBe(200)
        expect(getResponse.body.meal).toEqual(
            expect.objectContaining({
                name: 'Dinner Updated',
                is_on_diet: 0,
            })
        )
    })

    // ==================== DELETE ====================

    it.skip('should not be able to delete a meal without authentication', async () => {
        const response = await request(app.server)
            .delete('/meals/00000000-0000-0000-0000-000000000000')

        expect(response.status).toBe(401)
    })

    it.skip('should not be able to delete a meal from another user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Lunch',
                description: 'Chicken',
                meal_date_time: '2024-01-01 12:00:00',
                is_on_diet: true,
            })

        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        const mealId = listResponse.body.meals[0].id

        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()

        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]

        const response = await request(app.server)
            .delete(`/meals/${mealId}`)
            .set('Cookie', otherUserCookie!)

        expect(response.status).toBe(404)
    })

    it.skip('should be able to delete a meal of the authenticated user', async () => {
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

        const mealId = listResponse.body.meals[0].id

        const deleteResponse = await request(app.server)
            .delete(`/meals/${mealId}`)
            .set('Cookie', userCookie!)

        expect(deleteResponse.status).toBe(204)

        const afterDeleteResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)

        expect(afterDeleteResponse.body.meals).toHaveLength(0)
    })

    // ==================== METRICS ====================

    it.skip('should not be able to get metrics without authentication', async () => {
        const response = await request(app.server)
            .get('/meals/metrics')

        expect(response.status).toBe(401)
    })

    it.skip('should return metrics for the authenticated user', async () => {
        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Breakfast',
                description: 'Eggs and toast',
                meal_date_time: '2024-01-01 08:00:00',
                is_on_diet: true,
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Lunch',
                description: 'Chicken and rice',
                meal_date_time: '2024-01-01 12:00:00',
                is_on_diet: true,
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Snack',
                description: 'Chocolate bar',
                meal_date_time: '2024-01-01 15:00:00',
                is_on_diet: false,
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Dinner',
                description: 'Salad',
                meal_date_time: '2024-01-01 19:00:00',
                is_on_diet: true,
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Late Snack',
                description: 'Yogurt',
                meal_date_time: '2024-01-01 22:00:00',
                is_on_diet: true,
            })

        const response = await request(app.server)
            .get('/meals/metrics')
            .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            totalMeals: 5,
            mealsOnDiet: 4,
            mealsOffDiet: 1,
            bestSequence: 2,
        })
    })
})