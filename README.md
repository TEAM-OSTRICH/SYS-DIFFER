# CHRISDIFFER

![alt text](https://drive.google.com/uc?export=view&id=1IVS_33Ow-s8luwaqXJ_CkztKu5xjPffK)

Compare PostgreSQL Schemas and Generate Migration Scripts.

Chrisdiffer is a cross-platform desktop application to aid software engineers in schema migrations. With Chrisdiffer you can visually compare your source and target Postgres databases, easily identify changes and generate the necessary scripts to update the target from the source. View and select changes using an intuitive GUI and copy the scripts to run in psql.


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

**OR**

Download the app for Mac or Windows from http://www.chrisdiffer.com/.

# Usage

Simply provide the URLs or connection parameters to connect to your source and target databases. 

![](chrisdiff01.gif)

Tab between **'Source'** and **'Target'** to see representations of each database's schema.

![](chrisdiff02.gif)

Select the **'DB Diff'** tab to highlight all the differences between the two schemas:

**GREEN** for additions

**RED/PURPLE** for deletions

**YELLOW** for modifications

![](chrisdiff03.gif)

Click on differences to generate the SQL scripts necessary to update your source database's schema to match that of your target's. 

# Features
Compatible with any Postgres database (hosted on ElephantSQL, AWS, etc).

Lines are drawn to depict any foreign key relationships between data.

**'Add All'** allows you to generate all SQL scripts at once.

The **Refresh** button queries your databases to update the visual representations. After making changes to your source database, for example, you can refresh to ensure that its schema is now identical to that of the target's.

# Built With
- **[React](https://github.com/facebook/react)** Javascript library for building responsive web apps
- **[Electron](https://github.com/electron/electron)** Create cross platfrom desktop applications using HTML and JS
- **[pg-promise](https://github.com/vitaly-t/pg-promise)** Library for interacting with Postgres database
- **[D3](https://github.com/d3/d3)** Visualize and create animations from data

# Known Issues
Not compatible with Postgres 10.2+ hosted on AWS due to known bug with accessing the information_schema tables.

# Issues
Please let us know about any issues you're having [here](https://github.com/TEAM-OSTRICH/CHRISDIFFER/issues) or visit our [website](https://github.com/TEAM-OSTRICH/CHRISDIFFER/issues) for more info.

# Future Updates
- Support for other relational databases such as MySQL
- Support for composite primary keys
- Support for default values, checks, stored procedures

# Authors
- Ge Sun (https://github.com/g-es)
- Edwin Lee Rogers (https://github.com/eleerogers)
- Kevin Mui (https://github.com/kmui18)

# License
```
The MIT License (MIT)
Copyright © 2018 TEAM-OSTRICH

```
