// Criando variáveis que receberão valores gerados pelos módulos
var faker = require('faker')
var cpf = require('gerador-validador-cpf')


// Criando um modulo para usar uma única fonte de dados para geração de massa, será usada nos casos de testes.
export default {
    deliver: function () {

        var firstName = faker.name.firstName() // Gerando variável que receberá valor para "firstName" gerado dinamicamente
        var lastName = faker.name.lastName() // Gerando variável que receberá valor para "lastName" gerado dinamicamente
        //var phone = faker.phone.phone()
        // Formato JS 
        var data = {
            name: `${firstName} ${lastName}`, // Recebendo valores dinamicamente
            cpf: cpf.generate(), // Gerando um numero de CPF dinâmico
            email: faker.internet.email(firstName), // Gerando email dinâmico e usando o firstName criado acima
            whatsapp: '21987877787',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Apt 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data
    }
}