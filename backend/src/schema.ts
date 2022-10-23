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

            medicineAssignments: relationship({
                ref: "MedicineAssignment.user",
                many: true
            }),

            medicineCaptures: relationship({
                ref: "MedicineCapture.user",
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
        access: {
            operation: allowAll,
            filter: {
                query({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { user: { participatedStudies: { some: { coordinators: { some: { id: { equals: session.data.id } } } } } } };
                    } else if(session?.data?.role === "patient") {
                        return { user: { id: { equals: session.data.id } } };
                    }
                    return false;
                },
                update({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { user: { participatedStudies: { some: { coordinators: { some: { id: { equals: session.data.id } } } } } } };
                    } else if(session?.data?.role === "patient") {
                        return { user: { id: { equals: session.data.id } } };
                    }
                    return false;
                },
                delete({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    return false;
                }
            }
        },
        fields: {
            user: relationship({ ref: "User.symptomReports" }),
            time: timestamp({ validation: { isRequired: true } }),
            symptom: text({ validation: { isRequired: true } }),
            notes: text({ validation: { isRequired: true } })
        }
    }),

    Medicine: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } }),
            study: relationship({ ref: "Study.medicine" }),
            medicineCaptures: relationship({
                ref: "MedicineCapture.medicine",
                many: true
            })
        }
    }),

    MedicineAssignment: list({
        access: {
            operation: allowAll,
            filter: {
                query({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { study: { coordinators: { some: { id: { equals: session.data.id } } } } };
                    } else if(session?.data?.role === "patient") {
                        return { user: { id: { equals: session.data.id } } };
                    }
                    return false;
                },
                update({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { study: { coordinators: { some: { id: { equals: session.data.id } } } } };
                    }
                    return false;
                },
                delete({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { study: { coordinators: { some: { id: { equals: session.data.id } } } } };
                    }
                    return false;
                }
            }
        },
        fields: {
            user: relationship({ ref: "User.medicineAssignments" }),
            study: relationship({ ref: "Study.medicineAssignment" }),
            quantity: integer({ validation: { min: 0, isRequired: true } }),
            directions: text({ validation: { isRequired: true } }),
            startDate: timestamp({ validation: { isRequired: true } }),
            endDate: timestamp({ validation: { isRequired: true } })
        }
    }),

    MedicineCapture: list({
        access: allowAll,
        fields: {
            user: relationship({ ref: "User.medicineCaptures" }),
            time: timestamp({ validation: { isRequired: true } }),
            medicine: relationship({ ref: "Medicine.medicineCaptures" })
        }
    }),

    Study: list({
        access: {
            operation: allowAll,
            filter: {
                query({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { coordinators: { some: { id: { equals: session.data.id } } } };
                    } else if(session?.data?.role === "patient") {
                        return { participants: { some: { id: { equals: session.data.id } } } };
                    }
                    return false;
                },
                update({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    if(session?.data?.role === "coordinator") {
                        return { coordinators: { some: { id: { equals: session.data.id } } } };
                    }
                    return false;
                },
                delete({ session }) {
                    if(session?.data?.role === "admin") { return true; }
                    return false;
                }
            }
        },
        fields: {
            name: text({ validation: { isRequired: true } }),
            description: text({ validation: { isRequired: true } }),
            medicine: relationship({ ref: "Medicine.study" }),
            medicineAssignment: relationship({
                ref: "MedicineAssignment.study"
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
