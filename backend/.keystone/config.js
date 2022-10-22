"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// src/schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      role: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "patient", value: "patient" },
          { label: "coordinator", value: "coordinator" },
          { label: "admin", value: "admin" },
          { label: "dev", value: "dev" }
        ]
      }),
      symptomReports: (0, import_fields.relationship)({
        ref: "SymptomReport.user",
        many: true
      }),
      medicineAssignments: (0, import_fields.relationship)({
        ref: "MedicineAssignment.user",
        many: true
      }),
      medicineCaptures: (0, import_fields.relationship)({
        ref: "MedicineCapture.user",
        many: true
      }),
      participatedStudies: (0, import_fields.relationship)({
        ref: "Study.participants",
        many: true
      }),
      coordinatedStudies: (0, import_fields.relationship)({
        ref: "Study.coordinators",
        many: true
      })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Tag: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true })
    }
  }),
  Symptom: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  }),
  SymptomReport: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User.symptomReports" }),
      time: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
      symptom: (0, import_fields.text)({ validation: { isRequired: true } }),
      notes: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  }),
  Medicine: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      study: (0, import_fields.relationship)({ ref: "Study.medicine" }),
      medicineCaptures: (0, import_fields.relationship)({ ref: "MedicineCapture.medicine", many: true })
    }
  }),
  MedicineAssignment: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User.medicineAssignments" }),
      study: (0, import_fields.relationship)({ ref: "Study.medicineAssignment" }),
      frequency: (0, import_fields.bigInt)({ validation: { min: 0n, isRequired: true } }),
      quantity: (0, import_fields.bigInt)({ validation: { min: 0n, isRequired: true } }),
      direction: (0, import_fields.text)({ validation: { isRequired: true } }),
      startDate: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
      endDate: (0, import_fields.timestamp)({ validation: { isRequired: true } })
    }
  }),
  MedicineCapture: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User.medicineCaptures" }),
      time: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
      medicine: (0, import_fields.relationship)({ ref: "Medicine.medicineCaptures" })
    }
  }),
  Study: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ validation: { isRequired: true } }),
      medicine: (0, import_fields.relationship)({ ref: "Medicine.study" }),
      medicineAssignment: (0, import_fields.relationship)({ ref: "MedicineAssignment.study" }),
      participants: (0, import_fields.relationship)({
        ref: "User.participatedStudies",
        many: true
      }),
      coordinators: (0, import_fields.relationship)({
        ref: "User.coordinatedStudies",
        many: true
      })
    }
  })
};

// src/auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && true) {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: false ? void 0 : {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    server: {
      port: 3001
    },
    lists,
    session
  })
);
