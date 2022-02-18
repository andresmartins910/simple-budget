context("Enters Home Page", () => {
    it("Should be able to enter Home Page and redirect to Register Page", () => {
        cy.visit("http://localhost:3000")
        cy.viewport(1440, 900)

        cy.contains("Sign up").click()
        cy.wait(3000)
    })
})

context("Create new Register", () => {
    it("Should be able to create a new Register", () => {
        cy.visit("http://localhost:3000/signup")
        cy.get('input[placeholder="John Smith"]').type("Teste")
        cy.wait(500)
        cy.get('input[placeholder="your@email.com"]').type("teste@hotmail.com")
        cy.wait(500)
        cy.get(":nth-child(7) > #field-1").type("123456")
        cy.wait(500)
        cy.get(":nth-child(9) > #field-1").type("123456")
        cy.wait(500)
        cy.get(".chakra-button").click()
        cy.intercept("POST", "/signup", {
            statusCode: 200,
            body: {
                name: "Teste",
                email: "teste@hotmail.com",
                password: "123456",
                confirm_password: "123456"
            },
          }).as("new-User");
        cy.wait(3000)
    })
})

context("Login", () => {
    it("Should be able to Login", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('input[placeholder="your@email.com"]').type("teste@hotmail.com")
        cy.wait(500)
        cy.get('input[placeholder="******"]').type("123456")
        cy.wait(500)
        cy.get("button[type=submit]").click()
        cy.wait(3000)
    })
})

context("Enters Dashboard Page" , () => {
    it("Should be able to Create a new Budget", () => {
        cy.get(":nth-child(4) > .css-q5xwgn").click()
        cy.wait(500)
        cy.get('input[placeholder="Type budget name"]').type("Escola")
        cy.wait(500)
        cy.get('input[placeholder="Ex: 3000.00"]').type("2400")
        cy.wait(500)
        cy.get("button[type=submit]").click()
        cy.wait(3000)
    })

    it("Should be able to Add new Expense", () => {
        cy.contains("Add expense").click()
        cy.get("select").select("Food")
        cy.get('input[placeholder="Ex: Cardiologist"]').type("Alimentação")
        cy.wait(500)
        cy.get('input[placeholder="Ex: Medical check - Dr.Strauss"]').type("Despesa destinado à comida da criança")
        cy.wait(500)
        cy.get('input[placeholder="Ex: 300.00"]').type("350")
        cy.wait(500)
        cy.get("button[type=submit]").click()
        cy.wait(3000)
    })

    it("Should be able to View Expenses", () => {
        cy.contains("View expenses").click()
        cy.get('.css-aumf0v > [viewBox="0 0 1024 1024"]').click()
        cy.wait(3000)
    })

    it("Should be able to Edit Expense", () => {
        cy.get(':nth-child(3) > .chakra-input').clear().type("Alimentação Mensal")
        cy.wait(500)
        cy.get(':nth-child(5) > .chakra-input').clear().type("Despesa destinado à comida mensal na escola")
        cy.wait(500)
        cy.get(':nth-child(7) > .chakra-input').clear().type("600")
        cy.wait(500)
        cy.get("button[type=submit]").click()
        cy.wait(3000)
    })

    it("Should be able to Delete Expense", () => {
        cy.get('.css-aumf0v > [viewBox="0 0 448 512"] > path').click()
        cy.get(".chakra-modal__close-btn").click()
        cy.wait(3000)
    })

    it("Should be able to Delete Budget", () => {
        cy.get(".css-7g5sjm > path").click()
        cy.wait(3000)
    })

    it("Should be able to Logout", () => {
        cy.get(":nth-child(4) > .css-tvs47z > svg").click()
    })
})