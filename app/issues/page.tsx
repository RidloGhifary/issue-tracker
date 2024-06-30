"use client";

import { getAllIssues } from "@/actions/issues";
import { useEffect, useState } from "react";

export default function Issues() {
  const [issues, setIssues] = useState<any>();

  const fetchData = async () => {
    const issues = await getAllIssues();
    setIssues(issues);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl container mx-auto">
      <ol>
        {issues?.map((issue: any) => (
          <li key={issue.id}>- {issue.title}</li>
        ))}
      </ol>
    </div>
  );
}
