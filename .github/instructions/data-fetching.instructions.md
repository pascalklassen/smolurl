---
description: Read this file to understand the data fetching instructions for the project.
---

# Data Fetching Guidelines

This document outlines the best practices and guidelines for fetching data in our Next.js application. Adhering to these guidelines will help ensure consistency, maintainability, and optimal performance across the project.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use server components for data fetching whenever possible. Server components allow you to fetch data directly on the server, reducing the amount of JavaScript sent to the client and improving performance. NEVER use Client Components for data fetching.

## 2. Data-Fetching Methods

ALWAYS use the helper functions in the /data directory for fetching data. NEVER fetch data directly within your components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.
