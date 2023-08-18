// import { Model } from "sequelize";

// export interface BookAttributes {
//   id?: string;
//   title: string;
//   description: string;
//   authorId: string;
// }

// export interface BookInstance extends Model<BookAttributes>, BookAttributes {}

import { Model, Optional } from "sequelize";

// These are all the attributes in the Book model
export interface BookAttributes {
  id: string;
  title: string;
  description: string;
  authorId: string;
}

// Some attributes are optional in `Book.build` and `Book.create` calls
export type BookCreationAttributes = Optional<BookAttributes, "id">;

// Define the complete type for Book instances
export interface BookInstance
  extends Model<BookAttributes, BookCreationAttributes>,
    BookAttributes {}
