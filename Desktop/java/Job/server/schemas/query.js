const db = require("../db");
const {
  UserType,
  CompanyType,
  JobPostingType,
  ChatType,
  AppliedType,
  SetApplyType,
  ChatHeadType,
} = require("./types");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLScalarType,
} = require("graphql");
const { response } = require("express");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  description: "Root query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "Users info",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM job_users");
        return response.rows;
      },
    },
    user: {
      type: new GraphQLList(UserType),
      description: "One Users info",
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT * FROM job_users WHERE id = $1",
          [args.id]
        );
        return response.rows;
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      description: "Company info",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM job_companies");
        return response.rows;
      },
    },
    company: {
      type: new GraphQLList(CompanyType),
      description: "One company",
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT * FROM job_companies WHERE id= $1",
          [args.id]
        );
        return response.rows;
      },
    },
    jobs: {
      type: new GraphQLList(JobPostingType),
      description: "Job posting list",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM job_postings");
        return response.rows;
      },
    },
    chats: {
      type: new GraphQLList(ChatType),
      description: "All users chats between companies",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * from job_chat");
        return response.rows;
      },
    },
    applied: {
      type: new GraphQLList(SetApplyType),
      description: "One user who applied",
      args: { acc_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT * from job_applied WHERE acc_id = $1",
          [args.acc_id]
        );
        return response.rows;
      },
    },
    appliedAll: {
      type: new GraphQLList(SetApplyType),
      description: "A list of users who applied",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * from job_applied");
        return response.rows;
      },
    },
    singleChatCompany: {
      type: new GraphQLList(ChatType),
      description: "A list of one companies chat",
      args: { company_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT * FROM job_chat WHERE company_id = $1",
          [args.company_id]
        );
        return response.rows;
      },
    },
    singleChatUser: {
      type: new GraphQLList(ChatType),
      description: "A list of one companies chat",
      args: { account_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT * FROM job_chat WHERE account_id = $1",
          [args.account_id]
        );
        return response.rows;
      },
    },
    chatHead:{
      type:new GraphQLList(ChatHeadType),
      description:"A chat head of chat",
      resolve:async(parent,args)=>{
        const response = await db.query("SELECT * FROM job_chathead")
     return response.rows;  
    }
    }
  }),
});

exports.RootQuery = RootQuery;
