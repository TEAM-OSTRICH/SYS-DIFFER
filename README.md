# CHRISDIFFER

Compare PostgreSQL Schemas and Generate Migration Scripts.

Chrisdiffer is a cross-platform desktop application to aid software engineers in schema migrations. With Chrisdiffer you can visually compare your source and target databases, easily identify changes and generate the necessary scripts to update the target from the source. View and select changes using an intuitive GUI and copy the scripts to run in psql.


# Installation

Clone or download the repo.

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

Select the 'DB Diff' tab to highlight all the differences between the two schemas: red/purple for deletions, green for additions and yellow for modifications. Clicking on differences will generate the SQL scripts necessary to update your source database's schema to match that of your target's. 

<insert gif>


# Features

Lines are drawn to depict any foreign key relationships between data.

'Add all' allows you to generate all SQL scripts at once.

The refresh button re-connects to your databases to update the visual representations. After making changes to your source database, for example, you can refresh to ensure that its schema is now identical to that of the target's.

# License
```
The MIT License (MIT)
Copyright © 2018 TEAM-OSTRICH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
