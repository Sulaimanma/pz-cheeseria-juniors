const express = require('express');
const apiRouter = require('./routes');
const mongoose = require('mongoose');

const Purchase = require('./data/models/purchase');

const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')
const app = express();

//Connect to mogonDB datatbase
mongoose
  .connect(
    // 'mongodb+srv://sulaiman:Lgp2755487@pz-cheese.cp3h9.mongodb.net/pz-cheese?retryWrites=true&w=majority'
    `mongodb+srv://sulaiman:Lgp2755487@pz-cheese.cp3h9.mongodb.net/pz-cheese?retryWrites=true&w=majority`
  )
  .then((result: any[]) => {
    console.log('connect result', result);
    //Clean database
    // Purchase.deleteMany()
    //   .then(function () {
    //     console.log('Data deleted'); // Success
    //   })
    //   .catch(function (error) {
    //     console.log(error); // Failure
    //   });
  })
  .catch((err: any[]) => console.log('connection error', err));

//Add middleware to parse json
app.use(express.json());
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 5700;

// mock data

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' }
]

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const cheese = [
  {
    "id": 1,
    "title": "ABBAYE DE BELLOC",
    "price": 109.95,
    "description": "Abbaye de Belloc is a flat wheel-shaped traditional, farmhouse, unpasteurised, semi-hard cheese made from sheep's milk. It has a natural, crusty, brownish rind with patches of red, orange and yellow. The rind is marked with tiny craters.",
    "category": "creamy, dense and firm",
    "image": "https://www.cheese.com/media/img/cheese/Abbaye-de-Belloc.jpg",
    "authorId": 3
  },
  {
    "id": 2,
    "title": "ABBAYE DU MONT DES CATS",
    "price": 29.21,
    "description": "The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow's milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks",
    "category": "semi-soft, artisan, brined",
    "image": "https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg",
    "authorId": 1
  },
  {
    "id": 3,
    "title": "ADELOST",
    "price": 367.55,
    "description": "Adelost is a Swedish blue cheese made from cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.",
    "category": "semi-soft, blue-veined",
    "image": "https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg",
    "authorId": 2
  },
  {
    "id": 4,
    "title": "FETA",
    "price": 78.65,
    "description": "Feta is undoubtedly one of the most famous Greek cheeses. In fact, Feta occupies 70% stake in Greek cheese consumption. To create traditional feta, 30 percent of goat's milk is mixed with sheep's milk of animals grazing on pastures in the specific appellation of origin regions.",
    "category": "soft, brined",
    "image": "https://www.cheese.com/media/img/cheese/504_feta.jpg",
    "authorId": 1
  },
  {
    "id": 5,
    "title": "JARLSBERG",
    "price": 88.15,
    "description": "Jarlsberg is a mild, semi-soft cow’s milk cheese of Norwegian origin. Created by Anders Larsen Bakke, it resembles a Swiss Emmental with distinctive, open and irregular ‘eyes’. Many a times Jarlsberg is marketed as a Swiss cheese because of its characteristics, though it tends to be sweeter and stronger than Emmentaler.",
    "category": "open, smooth and supple",
    "image": "https://www.cheese.com/media/img/cheese/Jarlsberg_in_Wholefoods_2.jpg",
    "authorId": 2
  },
  {
    "id": 6,
    "title": "MAASDAM",
    "price": 140,
    "description": "Maasdam is a traditional, semi-hard Dutch cheese made from cow’s milk. The most characteristic feature is its ‘eyes’ (holes) that make up most of the cheese. The cheese was created in the early 1990s as an alternative to more expensive Swiss Emmental cheese. It is a high-fat cheese with a minimum of 45% fat. Although similar to Emmental, the moisture content in Maasdam is more, making it suppler.",
    "category": "creamy, open and supple",
    "image": "https://www.cheese.com/media/img/cheese/wiki/maasdam.jpg",
    "authorId": 3
  },
  {
    "id": 7,
    "title": "ROYALP TILSIT",
    "price": 625.57,
    "description": "oyalp Tilsit or Swiss Tilsit is a light yellow semi-hard smear-ripened cheese made from unpasteurised/pasteurised cow milk. The pasteurised version is mild in flavour whereas the one made from fresh, unpasteurised milk is more strongly flavoured (called Farmhouse Tilsit). It is aged for about 5 months, which makes it a very strong smelling cheese comparable to a Limburger.",
    "category": "semi-hard, smear-ripened",
    "image": "https://www.cheese.com/media/img/cheese/Tilsit_cheese_1.jpg",
    "authorId": 1
  },
  {
    "id": 8,
    "title": "SAINT ALBRAY",
    "price": 860.62,
    "description": "Saint Albray is a flower-shaped cheese that comes from the Aquitaine region of France. Made with pasteurised cow's milk and ripened for 2 weeks, it slices off skilfully with each half-pound cut looking like a \"petal\". When each petal comes together around a disk, they form a hollow centre similar to a flower.",
    "category": "soft, soft-ripened",
    "image": "https://www.cheese.com/media/img/cheese/12-saint-albray-shutterstock_1222710106.jpg",
    "authorId": 2
  }
]
const CheeseType = new GraphQLObjectType({
  name: "Cheese",
  description: "This stands for a single cheese",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    image: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (cheese)=>{
        return authors.find(author=> author.id === cheese.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is the type of the cheese author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
})
const RootQueryTYpe = new GraphQLObjectType({
  name: "cheeseQuery",
  description: "Root Query",
  fields: () => ({
    cheeseList: {
      type: new GraphQLList(CheeseType),
      description: "return a list of cheese",
      resolve: () => cheese
    },
    cheese: {
      type: CheeseType,
      description: "return a single cheese",
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        return cheese.find((item) => (item.id === args.id))
      }
    }
  })
})
const RootMutationType = new GraphQLObjectType({
  name:"cheeseMutation",
  description:"cheese mutation",
  fields:()=>({
    addCheese:{
      type:CheeseType,
      description: "add a cheese",
      args:{
        id:{type: new GraphQLNonNull(GraphQLInt)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        image: { type: GraphQLString },
        authorId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (parent,args) =>{
        const cheeseToAdd = {
          id: 38,
          title: args.title,
          price: args.price,
          description: args.description,
          category: args.category,
          image: args.image,
          authorId: args.authorId
        } 
        console.log("cheese to add", cheeseToAdd)
        cheese.push(cheeseToAdd)
        console.log("cheese final",cheese)
        return cheeseToAdd;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query:
    RootQueryTYpe,
  mutation:
    RootMutationType

})



app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.listen(port, () => console.log(`Server listening on port: ${port}`));
