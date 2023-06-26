import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  type: string;
  status: string;
  created_by: string;
  updated_by?: string;
  approved_by?: string;
  created_at?: any;
  updated_at?: any;

  user_article_created_byTouser?: UserInterface;
  user_article_updated_byTouser?: UserInterface;
  user_article_approved_byTouser?: UserInterface;
  _count?: {};
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  type?: string;
  status?: string;
  created_by?: string;
  updated_by?: string;
  approved_by?: string;
}
