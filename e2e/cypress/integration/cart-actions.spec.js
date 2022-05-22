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

  //Generate a random string for testing purpose
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const Randomid = `testCheeseID-${id}`;
  const RandomTitle = `testCheeseTitle-${id}`;
  // prettier-ignore
  it('Test whether post and get request works well', () => {
    cy.get('[data-cy=open-the-cart]').click();
    const url = 'http://localhost:5700/api/purchase';
 
    //Post test data
    cy.request({
      method: 'POST',
      url: '/api/purchase',
      headers: {
        paymenttoken: 'sulaiman',
      },
      body: [
        {
          "id":Randomid,
          "amount": 3,
          "description": 'cheese description',
          "image": 'https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg',
          "price": '5',
          "purchaseTime": 'time',
          "title": RandomTitle,
        },
      ],
    });
    //Get the test data and compare
    cy.request({
      method: 'get',
      url: '/api/purchase',
    }).then((response) => {
      //Test whether the test data has been updated in the data correctly
      expect(response.body.find((item)=>(item.id===Randomid)).title).to.equal(RandomTitle);
     
    });
  });

  it(' Click the purchase button and post the cart items, and check whether purchased item is in the purchase history or not', () => {
    cy.get('[data-cy=open-the-cart]').click();
    cy.get('[data-cy=purchase-cheese]').click();

    cy.request({
      method: 'get',
      url: '/api/purchase',
    }).then((response) => {
      //test whether purchase button can post the data to the database
      expect(response.body.find((item) => item.title === 'ABBAYE DU MONT DES CATS').price).to.equal(
        '29.21'
      );
      expect(response.body.find((item) => item.title === 'ADELOST').price).to.equal('367.55');
    });
  });
});
