"use client";

import { FormAlertSuccess } from "./form-alert-success";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createIssuesSchema } from "@/schemas";
import { useState } from "react";
import { FormAlertError } from "./form-alert-error";
import { createIssue } from "@/actions/issues";

export function IssueForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof createIssuesSchema>>({
    resolver: zodResolver(createIssuesSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createIssuesSchema>) => {
    try {
      // await fetch("/api/issues", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // }).then((data) => {
      //   if (!data.ok) {
      //     setError("Error occurred when submitting!");
      //   } else {
      //     setSuccess("Success creating!");
      //   }
      // });

      await createIssue(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    } catch {
      setError("Error occurred when submitting!");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Title</FormLabel>
                  <FormMessage className="text-rose-500" />
                </div>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Title"
                    {...field}
                    onChange={field.onChange}
                    className="rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Description</FormLabel>
                  <FormMessage className="text-rose-500" />
                </div>
                <FormControl>
                  <Textarea
                    disabled={form.formState.isSubmitting}
                    placeholder="description"
                    {...field}
                    onChange={field.onChange}
                    className="resize-none rounded-md"
                    rows={6}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {success && <FormAlertSuccess label={"Success creating!"} />}
          {error && <FormAlertError label={"Something went wrong!"} />}

          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
