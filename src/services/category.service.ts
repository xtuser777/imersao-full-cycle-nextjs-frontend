import { Category } from "../models";

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/categories`, {
      next: {
        revalidate: 1,
      },
    }); //revalidate on demand
    const data = await response.json();
    const categories: Category[] = [];
    for (let item of data) {
      categories.push({
        id: item.ID,
        name: item.Name,
      });
    }

    return categories;
  }
}
