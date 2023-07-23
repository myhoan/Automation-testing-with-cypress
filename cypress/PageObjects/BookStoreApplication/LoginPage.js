export const LoginPage = {
    loginToTheApplication(userName, password) {
        cy.get("#userName").clear().type(userName)
        cy.get("#password").clear().type(password)
        cy.get("#login").click()
        cy.contains(userName)
    },
    verifyValidLogin(userName) {
        cy.url().should('contain', '/profile')
        cy.get("#userName-value").should('have.text', userName)
        cy.visit('/login')
        cy.get('#loading-label').should('contain', 'You are already logged in. View your profile.')
        cy.get('#loading-label>a').click()
        cy.url().should('contain', '/profile')
        cy.get("#submit").click()
        cy.url().should('contain', '/login')
    },
    verifyAlertMessageForInvalidCredantial() {
        cy.get("#name").should('have.text', "Invalid username or password!")
    }
}