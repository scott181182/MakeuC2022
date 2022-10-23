"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      role: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "patient", value: "patient" },
          { label: "coordinator", value: "coordinator" },
          { label: "admin", value: "admin" }
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
      medicineCaptures: (0, import_fields.relationship)({
        ref: "MedicineCapture.medicine",
        many: true
      })
    }
  }),
  MedicineAssignment: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User.medicineAssignments" }),
      study: (0, import_fields.relationship)({ ref: "Study.medicineAssignment" }),
      quantity: (0, import_fields.integer)({ validation: { min: 0, isRequired: true } }),
      directions: (0, import_fields.text)({ validation: { isRequired: true } }),
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
      medicineAssignment: (0, import_fields.relationship)({
        ref: "MedicineAssignment.study"
      }),
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

// src/env.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var POSTGRES_USERNAME = process.env.DB_USERNAME ?? "postgres";
var POSTGRES_PASSWORD = process.env.DB_PASS ?? "password";
var POSTGRES_HOSTNAME = process.env.DB_HOSTNAME ?? "localhost";
var POSTGRES_PORT = process.env.DB_PORT ?? "5432";
var DB_NAME = process.env.DB_NAME ?? "ivdb";
var POSTGRES_CON_STRING = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${DB_NAME}`;

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: POSTGRES_CON_STRING,
      enableLogging: true,
      useMigrations: true
    },
    server: {
      port: 3001
    },
    lists,
    session
  })
);
