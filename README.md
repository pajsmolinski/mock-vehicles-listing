# Mock vehicle listing app

Application built in nextjs to showcase listing API data

## Tech stack

- **Framework**: [Next.js 16.2](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **UI Components**: Headless UI & Heroicons
- **Testing**: Jest + React Testing Library
- **API**: [Faux API](https://faux-api.com/) for mock data hosting

## Setup

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd listing-mock-data
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file and configure your API URL:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API endpoint:

   ```env
   NEXT_PUBLIC_API_URL=https://faux-api.com/api/your-dataset-id
   ```

   > **Note**: This project uses [faux-api.com](https://faux-api.com/) to host the `dataset.json` file. Upload your dataset there and use the provided API URL.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start development server on port 3000     |
| `npm run build` | Create production build                   |
| `npm run start` | Start production server                   |
| `npm run lint`  | Run ESLint for code quality               |
| `npm run test`  | Run Jest tests with React Testing Library |

## Environment Variables

| Variable              | Description                        | Required | Example                           |
| --------------------- | ---------------------------------- | -------- | --------------------------------- |
| `NEXT_PUBLIC_API_URL` | API endpoint URL from faux-api.com | Yes      | `https://faux-api.com/api/abc123` |

## API Integration

This project uses [faux-api.com](https://faux-api.com/) for mock data hosting. The API expects:

**Vehicle Data Structure:**

```typescript
interface Vehicle {
  id: string;
  make: string;
  model: string;
  vin: string;
  color: string;
  fuel: string;
  type: string;
  miles: number;
  year: number;
}
```

**Supported Query Parameters:**

- `globalSearch` - Search across multiple fields
- `color`, `fuel`, `type` - Filter by specific properties
- `searchMode` - "AND" or "OR" for multiple filters
- `page`, `limit` - Pagination
- `sortBy`, `sortOrder` - Sorting

---

This is a recruitment task project. For any questions or improvements, please reach out.
