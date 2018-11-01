import _ from 'lodash';

let arr1 = [{'name':'kevin', 'age':40}, {'name':'paul', 'age': 28}, {'name': 'chris', 'age': 27}, {'name': 'ge', 'age': 40}];
let arr2 = [{'name':'kevin', 'age': 35}, {'name':'paul', 'age': 20}, {'name': 'chris', 'age': 41}, {'name':'edroll', 'age':27}];
let arr3 = [];

// // console.log(arr3)
// function getObjectDiff(obj1, obj2) {
//   const diff = Object.keys(obj1).reduce((result, key) => {
//       if (!obj2.hasOwnProperty(key)) {
//           result.push(key+' is not in 2');
//       } else if (_.isEqual(obj1[key], obj2[key])) {
//         // console.log(obj1[key], obj2[key])
//           const resultKeyIndex = result.indexOf(key);
//           result.splice(resultKeyIndex, 1);
//       } else if(!_.isEqual(obj1[key], obj2[key])){
//         console.log('hi', obj1[key],obj2[key])
//         result.push(key+' edited')
//       }
//       return result;
//   }, Object.keys(obj2));

//   return diff;
// }

// var compare = function (a, b) {

//   var result = {
//     different: [],
//     missing_from_first: [],
//     missing_from_second: []
//   };

//   _.reduce(a, function (result, value, key) {
//     if (b.hasOwnProperty(key)) {
//       if (_.isEqual(value, b[key])) {
//         return result;
//       } else {
//         if (typeof (a[key]) != typeof ({}) || typeof (b[key]) != typeof ({})) {
//           //dead end.
//           result.different.push(key);
//           return result;
//         } else {
//           var deeper = compare(a[key], b[key]);
//           result.different = result.different.concat(_.map(deeper.different, (sub_path) => {
//             return key + "." + sub_path;
//           }));

//           result.missing_from_second = result.missing_from_second.concat(_.map(deeper.missing_from_second, (sub_path) => {
//             return key + "." + sub_path;
//           }));

//           result.missing_from_first = result.missing_from_first.concat(_.map(deeper.missing_from_first, (sub_path) => {
//             return key + "." + sub_path;
//           }));
//           return result;
//         }
//       }
//     } else {
//       result.missing_from_second.push(key);
//       return result;
//     }
//   }, result);

//   _.reduce(b, function (result, value, key) {
//     if (a.hasOwnProperty(key)) {
//       return result;
//     } else {
//       result.missing_from_first.push(key);
//       return result;
//     }
//   }, result);

//   return result;
// }

// let obj1 = {
//   a: 1,
//   b: 2,
//   c: { foo: 1, bar: 2},
//   d: { baz: 1, bat: 2 },
// }

// let obj2 = {
//   b: 2, 
//   c: { foo: 1, bar: 'monkey'}, 
//   d: { baz: 1, bat: 2 },
//   e: 1,
// }

// var isArrayEqual = function(x, y) {
//   return _(x).differenceWith(y, _.isEqual).isEmpty();
// };

// var result1 = isArrayEqual(
//   [{a:1, b:2}, {c:3, d:4}],
//   [{b:2, a:1}, {d:4, c:3}]
// );

// var result2 = isArrayEqual(
//   [{a:1, b:2, c: 1}, {c:3, d:4}],
//   [{b:2, a:1}, {d:4, c:3}]
// );

// console.log(result1, result2)

// console.log(compare(obj1, obj2));

// result1 = [{'a':1},{'b':2},{'c':3},{'k':2}];
// result2 = [{'a':4},{'d':5}]; 
// //Find values that are in result1 but not in result2
// var uniqueResultOne = result1.filter(function(obj) {
//   return !result2.some(function(obj2) {
//       return obj.value == obj2.value;
//   });
// });
// console.log(uniqueResultOne)
// //Find values that are in result2 but not in result1
// var uniqueResultTwo = result2.filter(function(obj) {
//   return !result1.some(function(obj2) {
//       return obj.value == obj2.value;
//   });
// });

// //Combine the two arrays of unique entries
// var result = uniqueResultOne.concat(uniqueResultTwo);
// console.log(result)



// var old = [{ enabled: "true", name: "Obj1", id: 3 }, { enabled: "true", name: "Obj2", id: 4 }],
//     update = [{ enabled: "true", name: "Obj1", id: 3 }, { enabled: "true", name: "Obj2-updated", id: 4 }],
//     difference = [];

// old.forEach(function (a, i) {
//     Object.keys(a).forEach(function (k) {
//         if (a[k] !== update[i][k]) {
//             difference.push({ id: update[i].id, key: k, value: update[i][k], index: i });
//         }
//     });
// });
// update.forEach(function (a, i) {
//   Object.keys(a).forEach(function (k) {
//       if (a[k] !== old[i][k]) {
//           difference.push({ id: old[i].id, key: k, value: old[i][k], index: i });
//       }
//   });
// });

// console.log(difference,'ok');
// const list1 = [
//     { userId: 1234, userName: 'XYZ'  }, 
//     { userId: 1235, userName: 'ABC'  }, 
//     { userId: 1236, userName: 'IJKL' },
//     { userId: 1237, userName: 'WXYZ' }, 
//     { userId: 1238, userName: 'LMNO' }
// ];
// const list2 = [
//     { userId: 1235, userName: 'ABC'  },  
//     { userId: 1236, userName: 'IJKL' },
//     { userId: 1252, userName: 'AAAA' }
// ];




// OldDb.
const oldDb = [
  // Customer table.
  {
    name: 'customer',
    columns: [
      {
        name: 'email',
        dataType: 'varchar (255)',
        constraintType: 'UNIQUE',
      },
      {
        name: 'lastName',
        dataType: 'varchar (255)',
      },
      {
        name: 'cid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
      {
        name: 'firstName',
        dataType: 'varchar (255)',
      },
    ],
  },
  // Item table.
  {
    name: 'item',
    columns: [
      {
        name: 'sku',
        dataType: 'varchar (255)',
        constraintType: 'UNIQUE',
      },
      {
        name: 'iid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
    ],
  },
  // Order table.
  {
    name: 'order',
    columns: [
      {
        name: 'cid',
        dataType: 'integer',
        constraintType: 'FOREIGN KEY',
      },
      {
        name: 'oid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
      {
        name: 'createdAt',
        dataType: 'date',
      },
    ],
  },
  // Shipping table.
  {
    name: 'shipping',
    columns: [
      {
        name: 'method',
        dataType: 'varchar (255)',
      },
      {
        name: 'sid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
    ],
  },
];

// NewDb.
const newDb = [
  // Customer table.
  {
    name: 'customer',
    columns: [
      {
        name: 'email',
        dataType: 'varchar (255)',
      },
      {
        name: 'cid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
      {
        name: 'name',
        dataType: 'varchar (255)',
      },
    ],
  },
  // Order table.
  {
    name: 'order',
    columns: [
      {
        name: 'createdAt',
        dataType: 'date',
      },
      {
        name: 'oid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
    ],
  },
  // Shipping table.
  {
    name: 'shipping',
    columns: [
      {
        name: 'method',
        dataType: 'varchar (255)',
      },
      {
        name: 'sid',
        dataType: 'integer',
        constraintType: 'PRIMARY KEY',
      },
    ],
  },
];


const operation = (list1, list2, isUnion = false) =>
    list1.filter( a => isUnion === list2.some( b => a.name === b.name ) );

// Following functions are to be used:
const inBoth = (list1, list2) => operation(list1, list2, true),
      inFirstOnly = operation,
      inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);


console.log('inBoth:', inBoth(oldDb, newDb));
console.log('inFirstOnly:', inFirstOnly(oldDb, newDb));
console.log('inSecondOnly:', inSecondOnly(oldDb, newDb));


'use strict';

var isArray = require('lodash/isArray');
var isObject = require('lodash/isObject');

var keys = Object.keys;
var min = Math.min;

const nestedDiff = function nestedDiff(lhs, rhs) {
  var result = [];
  var lkeys = keys(lhs);
  var rkeys = keys(rhs);

  function removeIndexFromRkeys(index) {
    rkeys.splice(index, 1);
  }

  if (isArray(lhs) && isArray(rhs)) {
    var i = 0

    for (; i < min(lhs.length, rhs.length); i++) {
      var lval = lhs[i];
      var rval = rhs[i];

      if (isArray(lval) && isArray(rval)) {
        var differences = nestedDiff(lval, rval);
        if (differences.length) {
          result.push({
            kind: 'A',
            key: i,
            lhs: lval,
            rhs: rval,
            differences,
          });
        }
      } else if (isObject(lval) && isObject(rval)) {
        var differences = nestedDiff(lval, rval);
        if (differences.length) {
          result.push({
            kind: 'E',
            key: i,
            lhs: lval,
            rhs: rval,
            differences,
          });
        }
      } else if (lval !== rval) {
        result.push({
          kind: 'E',
          key: i,
          lhs: lval,
          rhs: rval,
        });
      }
    }

    if (i < lhs.length) {
      for (; i < lhs.length; i++) {
        result.push({
          kind: 'D',
          key: i,
          lhs: lhs[i],
        });
      }
    } else {
      for (; i < rhs.length; i++) {
        result.push({
          kind: 'A',
          key: i,
          lhs: rhs[i],
        });
      }
    }

    return result;
  }

  for (var i = 0; i < lkeys.length; i++) {
    var lkey = lkeys[i];
    var lval = lhs[lkey];
    var rindex = rkeys.indexOf(lkey);

    if (rindex === -1) {
      result.push({
        kind: 'D',
        key: lkey,
        lhs: lval,
      });
    } else if (rindex > -1) {
      var rval = rhs[rkeys[rindex]];

      if (isArray(lval) && isArray(rval)) {
        var differences = nestedDiff(lval, rval);
        if (differences.length) {
          result.push({
            kind: 'A',
            key: lkey,
            lhs: lval,
            rhs: rval,
            differences,
          });
        }
      } else if (isObject(lval) && isObject(rval)) {
        var differences = nestedDiff(lval, rval);
        if (differences.length) {
          result.push({
            kind: 'E',
            key: lkey,
            lhs: lval,
            rhs: rval,
            differences,
          });
        }
      } else if (lval !== rval) {
        result.push({
          kind: 'E',
          key: lkey,
          lhs: lval,
          rhs: rval,
        });
      }

      removeIndexFromRkeys(rindex);
    }
  }

  for (var i = 0; i < rkeys.length; i++) {
    var rkey = rkeys[i];
    result.push({
      kind: 'N',
      key: rkey,
      rhs: rhs[rkey],
    });
  }

  return result;
}
// console.log(nestedDiff({0:oldDb}, {0:newDb})[0].differences[0].lhs)
console.log(JSON.stringify(nestedDiff({0:oldDb}, {0:newDb})[0]))
