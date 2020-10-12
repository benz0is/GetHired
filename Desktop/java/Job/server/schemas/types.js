const graphql = require("graphql");
const {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  type: "Query",
  description: "List of users",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    wish: { type: GraphQLString },
    type: { type: GraphQLString },
    exp: { type: GraphQLString },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "CompanyType",
  type: "Query",
  description: "List of companies",
  fields: () => ({
    id: { type: GraphQLString },
    companyname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const JobPostingType = new GraphQLObjectType({
  name: "JobPosting",
  type: "Query",
  description: "List of job postings",
  fields: () => ({
    id: { type: GraphQLInt },
    ref_id: { type: GraphQLString },
    company: { type: GraphQLString },
    city: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    req: { type: GraphQLString },
    salary: { type: GraphQLString },
    remote: { type: GraphQLString },
    applied: { type: GraphQLString },
  }),
});

const ChatType = new GraphQLObjectType({
  name: "Chats",
  type: "Query",
  description: "All users chats between companies",
  fields: () => ({
    id: { type: GraphQLString },
    company_id: { type: GraphQLString },
    account_id: { type: GraphQLString },
    account_text: { type: GraphQLString },
    company_text: { type: GraphQLString },
  }),
});

const SetApplyType = new GraphQLObjectType({
  name: "SetApplyType",
  type: "Query",
  description: "Applied people query",
  fields: () => ({
    id: { type: GraphQLInt },
    posting_id: { type: GraphQLInt },
    ref_id: { type: GraphQLString },
    acc_id: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    exp: { type: GraphQLString },
  }),
});

const AppliedType = new GraphQLInputObjectType({
  name: "Applied",
  type: "Query",
  description: "Add applied people to list",
  fields: () => ({
    id: { type: GraphQLInt },
    posting_id: { type: GraphQLInt },
    ref_id: { type: GraphQLString },
    acc_id: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    exp: { type: GraphQLString },
  }),
});

const ChatHeadType = new GraphQLObjectType({
  name:"ChatHead",
  description:"Chat head of a chat",
  type:"Query",
  fields:()=>({
    id:{type:GraphQLString},
    company_id:{type:GraphQLString},
    account_id:{type:GraphQLString}
  })
})

exports.ChatHeadType = ChatHeadType
exports.ChatType = ChatType;
exports.UserType = UserType;
exports.CompanyType = CompanyType;
exports.JobPostingType = JobPostingType;
exports.AppliedType = AppliedType;
exports.SetApplyType = SetApplyType;
