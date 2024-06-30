import { getAllIssues } from "@/actions/issues";

export default async function Issues() {
  const issues = await getAllIssues();

  return (
    <div className="max-w-7xl container mx-auto">
      <ol>
        {issues?.map((issue) => (
          <li key={issue.id}>- {issue.title}</li>
        ))}
      </ol>
    </div>
  );
}
