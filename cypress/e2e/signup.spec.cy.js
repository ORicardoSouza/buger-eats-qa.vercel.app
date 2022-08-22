import SignupPage from "../pages/SingupPage";
import signupFactory from '../factories/SingnupFactory'

describe('Signup', () => {

    //beforeEach(function () {
    //    cy.fixture('deliver').then((d) => { // Invocando a massa de testes da pasta fixture
    //        this.deliver = d
    //    })
    //})
    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        // Armazenando a mensagem que será validada.
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)

    });
    it('Incorrect document', function () {
        var deliver = signupFactory.deliver() // Usando a camada de Factore e dando o nome de deliver
        deliver.cpf = '000000141AA' // Alterando em tempo real de teste o valor do campo, dando clareza que dado será alterado

        // Gerando uma variável que contem um objeto de dados
        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')

    })
    it('Incorrect email', function () {
        var deliver = signupFactory.deliver() // Usando a camada de Factore e dando o nome de deliver
        deliver.email = 'user.com.br' // Alterando em tempo real de teste o valor do campo, dando clareza que dado será alterado

        // Gerando uma variável que contem um objeto de dados
        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })
    //it.only('Require Fields', function () {
    //
    //
    //    SignupPage.go()
    //    SignupPage.submit()
    //    SignupPage.alertMessageShouldBe('É necessário informar o nome')
    //    SignupPage.alertMessageShouldBe('É necessário informar o CPF')
    //    SignupPage.alertMessageShouldBe('É necessário informar o email')
    //    SignupPage.alertMessageShouldBe('É necessário informar o CEP')
    //    SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //    SignupPage.alertMessageShouldBe('Selecione o método de entrega')
    //    SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    //
    //})

    context('Require Fields', function () {
        // Criando validação dinâmica, dessa forma caso uma das validações falhar o teste continua executando até o final.
        // os valores do campo "field", recebem nomes que facilitam o entendimento do testes, questão de semântica   
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]
        // Usando o before para executar uma  única vez essa função (acessar a pagina e clicar no botão)
        before(function () {
            SignupPage.go()
            SignupPage.submit()
        });

        messages.forEach(function (msg) {
            // Nesse it, o cypress irá percorrer todos os valores de "msg.field" da const messages(msg), com isso testará todos os cenários. 
            it(`${msg.field} is require`, function () {
                // Aqui a validação receberá o valor de output a cada vez que passar por um cenário mapeado.
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })

    })
})