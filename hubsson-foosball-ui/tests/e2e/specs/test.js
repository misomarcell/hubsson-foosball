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

    selectElement('player-select-red-defender', 'Zoli');
    selectElement('player-select-red-striker', 'Gábor');
    selectElement('player-select-blue-defender', 'Ezékiel');
    selectElement('player-select-blue-striker', 'Józsi');
    
  })

  function selectElement(testId, selectedItem) {
    const element = cy.get(`[test-id="${testId}"]`);
    element.children(`input`).click({force: true}).type(selectedItem);
    element.parent().find('[role="option"]').contains(selectedItem).click({force: true});
  }

})
