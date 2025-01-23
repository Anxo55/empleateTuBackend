import app from './app'

const PORT = process.env.PORT || 3000

// https://empleatetubackend-m3f7.onrender.com
app.listen(PORT, () => {
    console.log(`Servidor arrancando en el puerto ${PORT}`)
})