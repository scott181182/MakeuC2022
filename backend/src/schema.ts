// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
    integer,
    password,
    relationship,
    select,
    text,
    timestamp
} from "@keystone-6/core/fields";

// the document field is a more complicated field, so it has it's own package
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from ".keystone/types";

export const lists: Lists = {
    User: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our User list
        fields: {
            // by adding isRequired, we enforce that every User should have a name
            //   if no name is provided, an error will be displayed
            name: text({ validation: { isRequired: true } }),

            email: text({
                validation: { isRequired: true },
                // by adding isIndexed: 'unique', we're saying that no user can have the same
                // email as another user - this may or may not be a good idea for your project
                isIndexed: "unique"
            }),

            password: password({ validation: { isRequired: true } }),

            createdAt: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: { kind: "now" }
            }),

            role: select({
                type: "string",
                options: [
                    { label: "patient", value: "patient" },
                    { label: "coordinator", value: "coordinator" },
                    { label: "admin", value: "admin" }
                ]
            }),

            symptomReports: relationship({
                ref: "SymptomReport.user",
                many: true
            }),

            therapeuticAssignments: relationship({
                ref: "TherapeuticAssignment.user",
                many: true
            }),

            therapeuticCaptures: relationship({
                ref: "TherapeuticCapture.user",
                many: true
            }),

            participatedStudies: relationship({
                ref: "Study.participants",
                many: true
            }),

            coordinatedStudies: relationship({
                ref: "Study.coordinators",
                many: true
            })
        }
    }),

    Symptom: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } })
        }
    }),

    SymptomReport: list({
        access: allowAll,
        fields: {
            user: relationship({ ref: "User.symptomReports" }),
            time: timestamp({ validation: { isRequired: true } }),
            symptom: text({ validation: { isRequired: true } }),
            notes: text({ validation: { isRequired: true } })
        }
    }),

    Therapeutic: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } }),
            study: relationship({ ref: "Study.therapeutic" })
        }
    }),

    TherapeuticAssignment: list({
        access: allowAll,
        fields: {
            user: relationship({ ref: "User.therapeuticAssignments" }),
            study: relationship({ ref: "Study.therapeuticAssignment" }),
            quantity: integer({ validation: { min: 0, isRequired: true } }),
            therapeuticAssignmentSteps: relationship({ ref: "TherapeuticAssignmentSteps.therapeuticAssignment", many: true }),
            therapeuticCaptures: relationship({
                ref: "TherapeuticCapture.therapeuticAssignment",
                many: true
            }),
            startDate: timestamp({ validation: { isRequired: true } }),
            endDate: timestamp({ validation: { isRequired: true } })
        }
    }),

    TherapeuticAssignmentStep: list({
        access: allowAll,
        fields: {
            therapeuticAssignment: relationship({ ref: "TherapeuticAssignment.therapeuticAssignmentSteps" }),
            index: integer({ validation: { isRequired: true } }),
            direction: text({ validation: { isRequired: true } })
        }
    }),

    TherapeuticCapture: list({
        access: allowAll,
        fields: {
            user: relationship({ ref: "User.therapeuticCaptures" }),
            time: timestamp({ validation: { isRequired: true } }),
            therapeuticAssignment: relationship({ ref: "TherapeuticAssignment.therapeuticCaptures" })
        }
    }),

    Study: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } }),
            description: text({ validation: { isRequired: true } }),
            therapeutic: relationship({ ref: "Therapeutic.study" }),
            therapeuticAssignment: relationship({
                ref: "TherapeuticAssignment.study"
            }),
            participants: relationship({
                ref: "User.participatedStudies",
                many: true
            }),
            coordinators: relationship({
                ref: "User.coordinatedStudies",
                many: true
            })
        }
    })
};
