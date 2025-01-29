import app from './app'
import { ErrorMiddleware } from './middlewares/error.middleware'

const PORT = process.env.PORT || 3000
app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log(`Servidor arrancando en el puerto ${PORT}`)
})