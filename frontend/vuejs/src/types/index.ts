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

export type BlogForm = {
    title: string;
    body: string;
}

export type BlogData = {
    data: Blog[];
    links: any;
    meta: any;
};

export interface LaravelResponseCollection<T = any> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            page: number | null;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}