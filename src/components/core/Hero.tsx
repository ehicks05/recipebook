import type React from "react";

interface IProps {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
}

export const Hero = ({ title, subtitle, children }: IProps) => (
	<section className="bg-accent">
		<div className="mx-auto max-w-screen-2xl px-4 py-6">
			<div>
				{title && (
					<div className="text-3xl font-semibold text-accent-foreground">
						{title}
					</div>
				)}
				{subtitle && <div className="text-muted-foreground">{subtitle}</div>}
				{children && <div className="text-muted-foreground">{children}</div>}
			</div>
		</div>
	</section>
);
