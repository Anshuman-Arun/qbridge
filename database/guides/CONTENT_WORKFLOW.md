# Content Workflow Guide

This document outlines the steps to add, rename, or update lessons and modules in QBridge.

## 🟢 Quickest Way (Automation)
We have created a script to automate 90% of this process.

Run the following command in your terminal:
```bash
npm run new-lesson
```
Follow the prompts to create your lesson file and get the SQL code to run in Supabase.

---

## 🛠 Manual Process (If script fails or for custom edits)

### 1. Adding a New Lesson
**Goal**: Add a "Quantum Entanglement" lesson to the "Quantum Physics" course.

#### Step 1: Add to Database (Supabase)
You need to tell the database that this module exists.
1. Go to **Supabase Dashboard** -> **SQL Editor**.
2. Run an insert query (or use the Table Editor UI to add a row to `modules`):
   ```sql
   INSERT INTO public.modules 
   (course_id, title, slug, description, order_index, module_type)
   VALUES
   ('course-uuid-here', 'Quantum Entanglement', 'entanglement', 'Spooky action at a distance.', 2, 'lesson');
   ```
   *(Note: You need the `course_id` first. You can get it from the `courses` table).*

#### Step 2: Create the Component File
1. Create a new file in `src/components/content/quantum/EntanglementLesson.tsx`.
2. Add your content:
   ```tsx
   import { LatexBlock } from '@/components/features/LatexBlock';
   
   export function EntanglementLesson() {
       return (
           <div className="prose prose-invert">
               <h2>Quantum Entanglement</h2>
               <p>Content goes here...</p>
           </div>
       );
   }
   ```

#### Step 3: Register the Lesson
1. Open `src/components/content/registry.ts`.
2. Import your new component:
   ```typescript
   import { EntanglementLesson } from './quantum/EntanglementLesson';
   ```
3. Add it to the map (key **must match the slug** you used in DB):
   ```typescript
   export const lessonRegistry = {
       // ... existing
       'entanglement': EntanglementLesson, 
   };
   ```

---

### 2. Renaming a Lesson
**Goal**: Rename "Divisibility" to "Factors".

1. **DB**: Update the `title` and `slug` in the `modules` table.
2. **Code**: Rename `divisibility` to `factors` in `src/components/content/registry.ts`.
3. **Files (Optional)**: Rename the actual `.tsx` file if you want it to match, but this is not strictly required as long as the registry imports it correctly.

### 3. Deleting a Lesson
1. **DB**: Delete the row from `modules`. (Progress will cascade delete).
2. **Code**: Remove the entry from `registry.ts` and delete the file.
