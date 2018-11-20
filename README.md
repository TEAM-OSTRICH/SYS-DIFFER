# CHRISDIFFER

![alt text](https://drive.google.com/uc?export=view&id=1IVS_33Ow-s8luwaqXJ_CkztKu5xjPffK)

Compare PostgreSQL Schemas and Generate Migration Scripts.

Chrisdiffer is a cross-platform desktop application to aid software engineers in schema migrations. With Chrisdiffer you can visually compare your source and target databases, easily identify changes and generate the necessary scripts to update the target from the source. View and select changes using an intuitive GUI and copy the scripts to run in psql.


# Installation

**Clone** or **Download** the repo.

Run npm install to download the required libraries.

```
npm install
```

Run npm start to initiate the app.

```
npm start
```

# Usage

Simply provide the URLs or connection parameters to connect to your source and target databases. 

<insert gif>

Tab between 'Source' and 'Target' to see representations of each database's schema.

<insert gif>

Select the **'DB Diff'** tab to highlight all the differences between the two schemas: **red/purple** for deletions, **green** for additions and **yellow** for modifications. Clicking on differences will generate the SQL scripts necessary to update your source database's schema to match that of your target's. 

<insert gif>


# Features

Lines are drawn to depict any foreign key relationships between data.

**'Add all'** allows you to generate all SQL scripts at once.

The **refresh** button re-connects to your databases to update the visual representations. After making changes to your source database, for example, you can refresh to ensure that its schema is now identical to that of the target's.

# License
```
The MIT License (MIT)
Copyright © 2018 TEAM-OSTRICH

```
