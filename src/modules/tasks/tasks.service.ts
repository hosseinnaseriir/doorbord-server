import { Injectable } from '@nestjs/common';

type PermissionsType = "SALES" | "ADMIN" | "TECH";

type TaskFieldTypesType = "CHOOSE" | "SIMPLE" | "TECH" | "DATE";

type TaskCategoriesType = "SUBSCRIBER" | "SITE";

type TaskFieldOptionsType = {
    id: number | string;
    title: string;
    value: string;
}

type TaskFieldsType = {
    id: number | string;
    key: string;
    title: string;
    type: TaskFieldTypesType,
    required: boolean;
    options?: Array<TaskFieldOptionsType>
}

type TasksType = Array<{
    id: number | string;
    category: TaskCategoriesType,
    permissions: Array<PermissionsType>;
    key: string;
    title: string;
    fields: Array<TaskFieldsType>
}>

@Injectable()
export class TasksService {

    getAllTasksService(): TasksType {
        return [
            {
                id: 1,
                category: "SUBSCRIBER",
                permissions: ["SALES", "ADMIN"],
                key: "feasibility",
                title: "امکان سنجی",
                fields: [
                    {
                        id: 1,
                        key: "subscriber_name",
                        title: "نام مشترک",
                        type: "SIMPLE",
                        required: true,
                        options: []
                    },
                    {
                        id: 2,
                        key: "subscriber_type",
                        title: "نوع مشترک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "dedicate",
                                value: "dedicate",
                            },
                            {
                                id: 2,
                                value: "share",
                                title: "share",
                            }
                        ]
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        title: "تاریخ مراجعه",
                        type: "DATE",
                        required: true,
                    },
                    {
                        id: 4,
                        key: "card_number",
                        title: "شماره کارت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "payment_terms",
                        title: "شرایط پرداخت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "mobile",
                        title: "موبایل ",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "utm",
                        title: "UTM",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 8,
                        key: "link_type",
                        title: "نوع لینک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "ptp",
                                value: "ptp",
                            },
                            {
                                id: 2,
                                value: "ptmp",
                                title: "ptmp",
                            }
                        ]
                    },
                    {
                        id: 9,
                        key: "additional_information",
                        title: "توضیحات تکمیلی",
                        type: "SIMPLE",
                        required: false,
                    },
                ]
            },

            {
                id: 2,
                category: "SUBSCRIBER",
                permissions: ["SALES", "ADMIN"],
                key: "service_installation",
                title: "نصب سرویس ",
                fields: [
                    {
                        id: 1,
                        key: "subscriber_name",
                        title: "نام مشترک",
                        type: "SIMPLE",
                        required: true,
                        options: []
                    },
                    {
                        id: 2,
                        key: "subscriber_type",
                        title: "نوع مشترک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "dedicate",
                                value: "dedicate",
                            },
                            {
                                id: 2,
                                value: "share",
                                title: "share",
                            }
                        ]
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        title: "تاریخ مراجعه",
                        type: "DATE",
                        required: true,
                    },
                    {
                        id: 33,
                        key: "service_username",
                        title: "یوزرنیم سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 444,
                        key: "service_password",
                        title: "رمز سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 4,
                        key: "card_number",
                        title: "شماره کارت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "payment_terms",
                        title: "شرایط پرداخت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "mobile",
                        title: "موبایل ",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "utm",
                        title: "UTM",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 77,
                        key: "radio_username",
                        title: "یوزرنیم رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 77,
                        key: "radio_password",
                        title: "رمز رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 777,
                        key: "required_equipment",
                        title: "تجهیزات مورد نیاز ",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 8,
                        key: "link_type",
                        title: "نوع لینک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "ptp",
                                value: "ptp",
                            },
                            {
                                id: 2,
                                value: "ptmp",
                                title: "ptmp",
                            }
                        ]
                    },
                    {
                        id: 999,
                        key: "provider_popsite",
                        title: "نام پاپ سایت سرویس دهنده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 9999,
                        key: "fiduciary_equipment",
                        title: "تجهیزات امانی",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 9,
                        key: "additional_information",
                        title: "توضیحات تکمیلی",
                        type: "SIMPLE",
                        required: false,
                    },
                ]
            },

            {
                id: 3,
                category: "SUBSCRIBER",
                permissions: ["SALES", "ADMIN", "TECH"],
                key: "service_supprt",
                title: "پشتیبانی سرویس ",
                fields: [
                    {
                        id: 1,
                        key: "subscriber_name",
                        title: "نام مشترک",
                        type: "SIMPLE",
                        required: true,
                        options: []
                    },
                    {
                        id: 2,
                        key: "subscriber_type",
                        title: "نوع مشترک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "dedicate",
                                value: "dedicate",
                            },
                            {
                                id: 2,
                                value: "share",
                                title: "share",
                            }
                        ]
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        title: "تاریخ مراجعه",
                        type: "DATE",
                        required: true,
                    },
                    {
                        id: 33,
                        key: "service_username",
                        title: "یوزرنیم سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 444,
                        key: "service_password",
                        title: "رمز سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 4,
                        key: "card_number",
                        title: "شماره کارت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "payment_terms",
                        title: "شرایط پرداخت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "mobile",
                        title: "موبایل ",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "utm",
                        title: "UTM",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 77,
                        key: "radio_username",
                        title: "یوزرنیم رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 77,
                        key: "radio_password",
                        title: "رمز رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 777,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 8,
                        key: "link_type",
                        title: "نوع لینک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "ptp",
                                value: "ptp",
                            },
                            {
                                id: 2,
                                value: "ptmp",
                                title: "ptmp",
                            }
                        ]
                    },
                    {
                        id: 999,
                        key: "provider_popsite",
                        title: "نام پاپ سایت سرویس دهنده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 9999,
                        key: "fiduciary_equipment",
                        title: "تجهیزات امانی",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 9,
                        key: "additional_information",
                        title: "توضیحات تکمیلی",
                        type: "SIMPLE",
                        required: false,
                    },
                ]
            },

            {
                id: 3,
                category: "SUBSCRIBER",
                permissions: ["SALES", "ADMIN"],
                key: "end_service",
                title: "جمع آوری سرویس ",
                fields: [
                    {
                        id: 1,
                        key: "subscriber_name",
                        title: "نام مشترک",
                        type: "SIMPLE",
                        required: true,
                        options: []
                    },
                    {
                        id: 2,
                        key: "subscriber_type",
                        title: "نوع مشترک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "dedicate",
                                value: "dedicate",
                            },
                            {
                                id: 2,
                                value: "share",
                                title: "share",
                            }
                        ]
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        title: "تاریخ مراجعه",
                        type: "DATE",
                        required: true,
                    },
                    {
                        id: 33,
                        key: "service_username",
                        title: "یوزرنیم سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 444,
                        key: "service_password",
                        title: "رمز سرویس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 4,
                        key: "card_number",
                        title: "شماره کارت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "payment_terms",
                        title: "شرایط پرداخت",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "mobile",
                        title: "موبایل ",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "utm",
                        title: "UTM",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 77,
                        key: "radio_username",
                        title: "یوزرنیم رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 77,
                        key: "radio_password",
                        title: "رمز رادیو",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "link_type",
                        title: "نوع لینک",
                        type: "CHOOSE",
                        required: true,
                        options: [
                            {
                                id: 1,
                                title: "ptp",
                                value: "ptp",
                            },
                            {
                                id: 2,
                                value: "ptmp",
                                title: "ptmp",
                            }
                        ]
                    },
                    {
                        id: 999,
                        key: "provider_popsite",
                        title: "نام پاپ سایت سرویس دهنده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 9999,
                        key: "fiduciary_equipment",
                        title: "تجهیزات امانی",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 10,
                        key: "reason",
                        title: "علت",
                        type: "SIMPLE",
                        required: false,
                    },
                    {
                        id: 9,
                        key: "additional_information",
                        title: "توضیحات تکمیلی",
                        type: "SIMPLE",
                        required: false,
                    },
                ]
            },

            {
                id: 5,
                category: "SITE",
                key: "fix_problem",
                title: "رفع مشکل",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },


            {
                id: 6,
                category: "SITE",
                key: "installation",
                title: "نصب",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "end_service",
                        required: true,
                        title: "جمع اوری تجهیزات",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },

            {
                id: 7,
                category: "SITE",
                key: "end_service",
                title: "جمع آوری",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        required: true,
                        title: "جمع اوری تجهیزات",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },

            {
                id: 8,
                category: "SITE",
                key: "replacement",
                title: " جایگزینی ",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        required: true,
                        title: "جمع اوری تجهیزات",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },
            
            {
                id: 9,
                category: "SITE",
                key: "movement",
                title: " جا به جایی ",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "refer_date",
                        required: true,
                        title: "جمع اوری تجهیزات",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },
                
            {
                id: 10,
                category: "SITE",
                key: "feasibility",
                title: " امکان سنجی ",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "visit_review",
                        required: true,
                        title: "بازدید جهت بررسی",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            },

            {
                id: 11,
                category: "SITE",
                key: "review",
                title: "بازدید ",
                permissions: ["TECH", "ADMIN"],
                fields: [
                    {
                        id: 1,
                        key: "site_name",
                        required: true,
                        title: "نام سایت",
                        type: "SIMPLE",
                    },
                    {
                        id: 2,
                        key: "refer_date",
                        required: true,
                        title: "تاریخ مراجعه ",
                        type: "DATE",
                    },
                    {
                        id: 3,
                        key: "visit_review",
                        required: true,
                        title: "بازدید جهت بررسی",
                        type: "SIMPLE",
                    },
                    {
                        id: 5,
                        key: "reported_problem",
                        title: "مشکل اعلان شده",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 5,
                        key: "address",
                        title: "آدرس",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 6,
                        key: "representative_name",
                        title: "نام نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 7,
                        key: "representative_phone",
                        title: "شماره موبایل نماینده دکل",
                        type: "SIMPLE",
                        required: true,
                    },
                    {
                        id: 8,
                        key: "description",
                        title: "توضیحات",
                        type: "SIMPLE",
                        required: true,
                    }
                ]
            }

        ]
    }
}
