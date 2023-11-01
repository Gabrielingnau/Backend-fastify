import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { randomUUID } from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('stransactions')
    .insert({
      id: crypto.randomUIID(),
      title: 'transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    return console.log('HTTP Server runnig!')
  })
