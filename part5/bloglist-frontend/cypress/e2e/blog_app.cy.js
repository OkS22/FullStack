describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pikku Myy',
      username: 'pmyy',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17 Login form is shown', function() {
    cy.contains('login')
  })

  describe('5.18 Login',function() {
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('pmyy')
      cy.get('#password').type('wrong')
      cy.get('#login-button')
        .click()
        .then(() => {
          let el = Cypress.$('.new-el')
          if (el.length) {
            cy.get('.error')
              .should('contain', 'Error! \'invalid username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
          }
        })
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('pmyy')
      cy.get('#password').type('salainen')
      cy.get('#login-button')
        .click()
        .then(() => {
          let el = Cypress.$('.new-el') // evaluates after .then()
          if (el.length) {
            cy.contains('pmyy (Pikku Myy) logged-in')
          }
        })
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      localStorage.clear
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'pmyy', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('5.19 A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('New title')
      cy.get('#author-input').type('New author')
      cy.get('#url-input').type('New title')
      cy.get('#create-button').click()
      cy.get('.blog')
        .should('contain', 'New title')
        .and('contain', 'New author')
    })

    it('5.20 user can like a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('New title')
      cy.get('#author-input').type('New author')
      cy.get('#url-input').type('New title')
      cy.get('#create-button')
        .click()
        .then(() => {
          let el = Cypress.$('.new-el')
          if (el.length) {
            cy.get('.blog').contains('view').click()
            cy.get('.blog').get('#like-button').click()
          }
        })
    })

    it('5.21 user-creator can delete a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('New title')
      cy.get('#author-input').type('New author')
      cy.get('#url-input').type('New title')
      cy.get('#create-button')
        .click()
        .then(() => {
          let el = Cypress.$('.new-el')
          if (el.length) {
            cy.get('.blog')
              .should('contain', 'New title')
              .and('contain', 'New author')
            cy.get('.blog').contains('view').click()
            cy.get('.blog').get('#delete-button').click()
            cy.get('.blog').should('not.exist')
          }
        })
    })

    describe('5.22 order of likes', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first title', author: 'First author', url: 'li.com' })
        cy.createBlog({ title: 'second title', author: 'Second author', url: 'si.com' })
        cy.createBlog({ title: 'third title', author: 'Third author', url: 'fa.com' })
        cy.visit('http://localhost:3000')
      })

      it('5.22 order of likes', function() {
        cy.get('.blog').eq(0).as('blog1')
        cy.get('.blog').eq(1).as('blog2')
        cy.get('.blog').eq(2).as('blog3')

        cy.get('@blog1').find('button').eq(0).click()
        cy.get('@blog1').find('#like-button').as('like1')
        cy.get('@blog2').find('button').eq(0).click()
        cy.get('@blog2').find('#like-button').as('like2')
        cy.get('@blog3').find('button').eq(0).click()
        cy.get('@blog3').find('#like-button').as('like3')

        //first -> 1-> 3 place
        cy.get('@like1', { timeout: 10000 }).click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(0)
                .should('contain', '1')
            }
          })
        cy.get('@blog1').should('contain','likes 1')

        // second - 3 - 1 place
        cy.get('@like2').click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(1)
                .should('contain', '1')
            }
          })
        cy.get('@blog2').should('contain','likes 1')

        cy.get('@like2').click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(1)
                .should('contain', '2')
            }
          })
        cy.get('@blog2').should('contain','likes 2')

        cy.get('@like2').click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(1)
                .should('contain', '3')
            }
          })
        cy.get('@blog2').should('contain','likes 3')

        // third - 2 - 2 place
        cy.get('@like3').click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(1)
                .should('contain', '1')
            }
          })
        cy.get('@blog3').should('contain','likes 1')

        cy.get('@like3').click()
          .then(() => {
            let el = Cypress.$('.new-el')
            if (el.length) {
              cy.get('.blog').eq(1)
                .should('contain', '2')
            }
          })
        cy.get('@blog3').should('contain','likes 2')

        //check 1st -second , 2d -third , 3d - first
        cy.get('.blog').eq(0).should('contain', 'second').and('contain', '3')
        cy.get('.blog').eq(1).should('contain', 'third').and('contain', '2')
        cy.get('.blog').eq(2).should('contain', 'first').and('contain', '1')
      })
    })
  })
})