export interface UserEntity {
  id: number;
  email: string;
  name: string;
  password: string;
  cell_phone: string;
  user_type_id: number;
  blocked: boolean;
  created_at: Date;
  updated_at: Date;
}
