export interface LoginForm {
    email: string;
    password: string;
};

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export interface User {
    id: number;
    name: string;
    email: string;
}

export type Blog = {
    id: number;
    title: string;
    slug: string;
    body: string;
    is_published: boolean;
    created_at: string;
};

export type BlogData = {
    data: Blog[];
    links: any;
    meta: any;
};