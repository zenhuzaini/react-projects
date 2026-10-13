"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { CircleAlert, CircleCheck, LoaderCircle, X } from "lucide-react";

export const toast = BaseToast.createToastManager();

function ToastList() {
	const { toasts } = BaseToast.useToastManager();

	return (
		<BaseToast.Portal>
			<BaseToast.Viewport className="fixed inset-x-0 bottom-0 z-100 flex max-h-screen w-full flex-col gap-2 p-4 outline-none sm:left-auto sm:right-0 sm:w-96">
				{toasts.map((item) => (
					<BaseToast.Root
						key={item.id}
						toast={item}
						className="w-full rounded-lg border border-primarybrown/20 bg-primarywhite p-4 text-primaryText shadow-lg outline-none data-[type=success]:border-secondaryforestgreen/40 data-[type=error]:border-primaryred/40">
						<BaseToast.Content className="flex items-start gap-3">
							<span className="mt-0.5 shrink-0" aria-hidden="true">
								{item.type === "loading" ? (
									<LoaderCircle
										className="animate-spin text-secondaryforestgreen"
										size={18}
									/>
								) : item.type === "success" ? (
									<CircleCheck
										className="text-secondaryforestgreen"
										size={18}
									/>
								) : item.type === "error" ? (
									<CircleAlert className="text-primaryred" size={18} />
								) : null}
							</span>
							<div className="min-w-0 flex-1 space-y-1">
								{item.title && (
									<BaseToast.Title className="text-sm font-semibold" />
								)}
								<BaseToast.Description className="text-sm text-primarygrey" />
							</div>
							<BaseToast.Close
								aria-label="Dismiss notification"
								className="rounded p-1 text-primarygrey hover:bg-primarybrown/10 hover:text-primaryText">
								<X size={15} />
							</BaseToast.Close>
						</BaseToast.Content>
					</BaseToast.Root>
				))}
			</BaseToast.Viewport>
		</BaseToast.Portal>
	);
}

export function Toaster() {
	return (
		<BaseToast.Provider toastManager={toast}>
			<ToastList />
		</BaseToast.Provider>
	);
}
