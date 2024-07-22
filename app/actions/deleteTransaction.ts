"use server";
import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(
  transactionId: string
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    await db.transaction.delete({
      where: { id: transactionId, userId },
    });
    revalidatePath("/");
    return { message: "Transaction deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete transaction" };
  }
}

export default deleteTransaction;
