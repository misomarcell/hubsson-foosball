// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('button', 'Start game')
  })
})

describe('PlayerSelector', () => {
  

  it('', ()=> {
    cy.visit('/');


    cy.get(`[test-id="player-selection-red-defender"] input`).first().type('Z')
    .get('.Select-option:contains(Zoli)')
    .click();
    
    return;
    const element1 = cy.get('[test-id="player-selection-red-defender"]').first();
    const element2 = cy.get('[test-id="player-selection-red-defender"]>input');
    element1.click();
    element2.type('Zoli');
    element2.submit();


  })

})
