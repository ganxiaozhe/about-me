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
  intros: string[];
}


interface EmploymentItem {
  id: string;
  name: string;
  location: string;
  role: string;
  created_at: string;
  finished_at?: string;
  contents?: string[];
  supports?: {
    type:'image', value:string,
    name?:string
  }[];
}


interface ProjectItem {
  id: string;
  domClass?: string;
  title: string;
  icon?: string;
  url?: string;
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
  supports?: {
    type:'image', value:string,
    name?:string
  }[];
}


interface SkillItem {
  name: string;
  items: {
    key: string;
    value: string;
  }[];
}[]