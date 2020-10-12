const db = require("../db");
const {
  UserType,
  CompanyType,
  JobPostingType,
  AppliedType,
  SetApplyType,
  ChatType,
} = require("./types");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const RootQueryMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutates Root",
  fields: () => ({
    AddUser: {
      type: UserType,
      description: "Adds User To Database",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const response = db.query(
            "INSERT INTO job_users(id,name,surname,email,password,address,type) values($1,$2,$3,$4,$5,$6,$7)",
            [
              args.id,
              args.name,
              args.surname,
              args.email,
              args.password,
              args.address,
              args.type,
            ]
          );
          return response.rows;
        } catch (err) {
          console.log(err);
        }
      },
    },
    AddUser2: {
      type: UserType,
      description: "Add User 2nd Part",
      args: {
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        wish: { type: GraphQLString },
        exp: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const response = await db.query(
            "UPDATE job_users SET category = $1 , description = $2 , wish = $3 , exp = $4 WHERE id = $5 ",
            [args.category, args.description, args.wish, args.exp, args.id]
          );
          return response.rows;
        } catch (err) {
          console.log(err);
        }
      },
    },
    AddCompany: {
      type: CompanyType,
      description: "Add a company to DB",
      args: {
        id: { type: GraphQLString },
        companyname: { type: GraphQLString },
        description: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO job_companies(id,companyname,description,email,password,address,type)values($1,$2,$3,$4,$5,$6,$7)",
          [
            args.id,
            args.companyname,
            args.description,
            args.email,
            args.password,
            args.address,
            args.type,
          ]
        );
        return response.rows;
      },
    },
    AddPosting: {
      type: JobPostingType,
      description: "Add job posting",
      args: {
        ref_id: { type: GraphQLString },
        title: { type: GraphQLString },
        city: { type: GraphQLString },
        company: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        req: { type: GraphQLString },
        salary: { type: GraphQLString },
        remote: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO job_postings(ref_id,title,company,description,city,category,req,salary,remote) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
          [
            args.ref_id,
            args.title,
            args.company,
            args.description,
            args.city,
            args.category,
            args.req,
            args.salary,
            args.remote,
          ]
        );
        return response.rows;
      },
    },
    ApplyJob: {
      type: SetApplyType,
      description: "Send info to DB who applied to job",
      args: {
        posting_id: { type: GraphQLInt },
        ref_id: { type: GraphQLString },
        acc_id: { type: GraphQLString },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        exp: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO job_applied (posting_id,ref_id,acc_id,name,surname,category,description,exp)values($1,$2,$3,$4,$5,$6,$7,$8)",
          [
            args.posting_id,
            args.ref_id,
            args.acc_id,
            args.name,
            args.surname,
            args.category,
            args.description,
            args.exp,
          ]
        );
        return response.rows;
      },
    },
    DeleteJob: {
      type: JobPostingType,
      description: "Delete a job posting",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "delete from job_postings where id = $1",
          [args.id]
        );
        return response.rows;
      },
    },
    DeleteApplied: {
      type: SetApplyType,
      description: "Deletes the job posting in applied DB",
      args: { posting_id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "DELETE FROM job_applied WHERE posting_id = $1",
          [args.posting_id]
        );
        return response.rows;
      },
    },
    AddChat: {
      type: ChatType,
      description: "Chat between user and company",
      args: {
        id: { type: GraphQLString },
        company_id: { type: GraphQLString },
        account_id: { type: GraphQLString },
        account_text: { type: GraphQLString },
        company_text: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO job_chat(id,company_id,account_id,company_text,account_text)values($1,$2,$3,$4,$5)",
          [
            args.id,
            args.company_id,
            args.account_id,
            args.company_text,
            args.account_text,
          ]
        );
        return response.rows;
      },
    },
    AddChatHead: {
      type: ChatType,
      description: "Chat between user and company",
      args: {
        id: { type: GraphQLString },
        company_id: { type: GraphQLString },
        account_id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO job_chathead(id,company_id,account_id)values($1,$2,$3)",
          [
            args.id,
            args.company_id,
            args.account_id,
          ]
        );
        return response.rows;
      },
    },
    ChangeDescCompany:{
      type:CompanyType,
      description:"Changes the company's description",
      args:{id:{type:GraphQLString},
    description:{type:GraphQLString}},
    resolve:async(parent,args)=>{
      const response = await db.query("UPDATE job_companies SET description = $1 WHERE id = $2",[args.description,args.id])
    }
    },
    ChangeNameCompany:{
      type:CompanyType,
      description:"Changes the company's name",
      args:{id:{type:GraphQLString},
    companyname:{type:GraphQLString}},
    resolve:async(parent,args)=>{
      const response = await db.query("UPDATE job_companies SET companyname = $1 WHERE id = $2",[args.companyname,args.id])
    }
    },
    ChangeDescUser:{
      type:UserType,
      description:"Changes users description",
      args:{id:{type:GraphQLString},
    description:{type:GraphQLString}},
    resolve:async(parent,args)=>{
      const response = await db.query("UPDATE job_users SET description = $1 WHERE id = $2",[args.description,args.id])
    }
    },
    ChangeExpUser:{
      type:UserType,
      description:"Changes users description",
      args:{id:{type:GraphQLString},
    exp:{type:GraphQLString}},
    resolve:async(parent,args)=>{
      const response = await db.query("UPDATE job_users SET exp = $1 WHERE id = $2",[args.exp,args.id])
    }
    },

  }),
});

exports.RootQueryMutation = RootQueryMutation;
