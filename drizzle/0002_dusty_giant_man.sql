CREATE TABLE `purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripeSessionId` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`amountTotal` int NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'usd',
	`productName` varchar(255) NOT NULL,
	`productSlug` varchar(255),
	`paymentStatus` varchar(64) NOT NULL DEFAULT 'paid',
	`emailSent` int NOT NULL DEFAULT 0,
	`emailSentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `purchases_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
