import type { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
	return <div className="mx-auto w-full max-w-screen-2xl p-4">{children}</div>;
};
