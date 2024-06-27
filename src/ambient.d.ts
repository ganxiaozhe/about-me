namespace Playlet {
  interface ApiModel {
    addtime: string;
    episodes: number;
    id: number;
    name: string;
    number: number;
    url: string;
  }

  interface ApiResult {
    code:number;
    count:number;
    data:Playlet.ApiModel[]
  }
}





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

interface SupportItem {
  type:'image', value:string,
  name?:string,
  imageSize?: {
    width:number, height:number
  }
}


interface EmploymentItem {
  id: string;
  name: string;
  location: string;
  role: string;
  created_at: string;
  finished_at?: string;
  contents?: string[];
  supports?: SupportItem[];
}


interface ProjectItem {
  id: string;
  priority?: number;
  dom_class?: string;
  title: string;
  icon?: string;
  url?: string;
  url_host?: string;
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
  supports?: SupportItem[];
}


interface SkillItem {
  name: string;
  items: {
    key: string;
    value: string;
  }[];
}[]