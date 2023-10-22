interface Profile {
  fullname: string;
  fullname_en: string;
  nickname: string;
  nickname_en: string;
  gender: string;
  birthdate: string;
  email: string;
  phone?: string;
  website?: string;
}


interface ProjectList {
  class?: string;
  title: string;
  icon?: string;
  keywords: string[];
  created_at?: string;
  updated_at?: string;
  finished_at?: string;
  contents?: {
    key: string;
    value: string;
  }[];
  owned_by?: {
    company: string;
    role: string;
    created_at: string;
    finished_at?: string;
  };
}


interface SkillList {
  name: string;
  items: {
    key: string;
    value: string;
  }[];
}[]