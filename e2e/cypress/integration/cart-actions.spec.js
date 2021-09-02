/// <reference types="cypress" />

context('Cart Actions', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Add items to cart', () => {
    cy.visit('/');
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');
  });

  it('Open chart and check whether the item has been added into the cart', () => {
    cy.get('[data-cy=open-the-cart]').click();
    cy.get('[data-cy=cart-item-2]').should('exist');
    cy.get('[data-cy=cart-item-3]').should('exist');
  });

  it('Test whether post and get request works well', () => {
    cy.get('[data-cy=open-the-cart]').click();
    const url = 'http://localhost:3000/api/purchase';
    //Post test data
    cy.request({
      method: 'POST',
      url: url,
      headers: {
        paymenttoken: 'sulaiman',
      },
      body: [
        {
          title: 'cheese',
          id: 'cheese123',
        },
      ],
    });
    //Get the test data and compare
    cy.request({
      method: 'get',
      url: '/api/purchase',
    }).then((response) => {
      expect(response.body[0].title).to.equal('cheese');
      expect(response.body[0].id).to.equal('cheese123');
    });
  });

  it(' Click the purchase button and post the cart items, and check whether purchased item is in the purchase history or not', () => {
    cy.get('[data-cy=open-the-cart]').click();
    cy.get('[data-cy=purchase-cheese]').click();

    cy.request({
      method: 'get',
      url: '/api/purchase',
    }).then((response) => {
      expect(response.body[0].title).to.equal('cheese');
      expect(response.body[0].id).to.equal('cheese123');
    });
  });
});
