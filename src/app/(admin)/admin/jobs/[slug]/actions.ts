"use server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

type FormState = { error?: string } | undefined;

export async function approveSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // throw new Error("Not implemented");
    const jobId = parseInt(formData.get("jobId") as string);
    const session = await getAuthSession();
    if (session?.user.role !== "ADMIN") {
      throw new Error("Not Authorized !!");
    }

    await db.job.update({
      where: { id: jobId },
      data: { approved: true },
    });
    revalidatePath("/");
  } catch (error) {
    let message = "An error occurred while approving the submission";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
