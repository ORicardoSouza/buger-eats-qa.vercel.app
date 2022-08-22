class SignupPage {
    go() {
         // Alterando a resolução 
        cy.visit('/'); // Acessando o endereço web
        // Validando que acessou a pagina /deliver e que existe o texto "Cadastre-se para  fazer entregas" 
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }
    fillForm(deliver) {
        // Dados do entregador
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //Dados do endereço do entregador
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)
        // Click no botão
        cy.contains('.delivery-method li', deliver.delivery_method).click();

        // Expresão regular css
        // ^ começa por $ termina por  * Contem o valor
        // Upload de arquivo
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }
    submit() {
        // Enviando cadastro
        cy.get('form button[type="submit"]').click();
    }
    modalContentShouldBe(expectedMessage) { // <- aqui passamos a variável que ira armazenar o valor da mensagem a ser validada
        // verificando mensagem
        cy.get('.swal2-container .swal2-html-container')
            .should("have.text", expectedMessage)
    }
    alertMessageShouldBe(expectedMessage){
        //cy.get('.alert-error').should('have.text',expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage; // usando o "NEW", a classe será exportada  com uma nova intancia (Boa prática)

