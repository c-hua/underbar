/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      return n > array.length ? array : array.slice(array.length - n, n + 1);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection.constructor === Array) {
      for (var i = 0; i < collection.length; i++) {
        iterator.apply(null, [collection[i], i, collection]);
      }
    } else if (collection.constructor === Object) {
      for (var key in collection) {
        iterator.apply(null, [collection[key], key, collection]);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];
    _.each(collection, function(item) {
      if (test.call(null, item)) filtered.push(item);
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var opposite = _.filter(collection, test);

    return _.filter(collection, function(item) {
      return opposite.indexOf(item) < 0;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    for (var i = 0; i < array.length; i++) {
      if (unique.indexOf(array[i]) < 0) unique.push(array[i]);
    }
    return unique;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
    _.each(collection, function(item) { mapped.push(iterator(item)); });
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var isFunc = functionOrKey.constructor === Function;

    return _.map(collection, function(item) {
      if (isFunc) {
        return functionOrKey.apply(item, args)
      } else {
        return item[functionOrKey].apply(item, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var total = accumulator === undefined ? collection[0] : accumulator;
    _.each(collection, function(item) {
      total = iterator(total, item);
    });
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var reducer = function() {
     return  _.reduce(collection, function(passed, item) {
      if (!iterator) { return item; }
      else if (!iterator(item)) { return false; }
      return passed;
    }, true);
   };

   return collection.length === 0 ? true : reducer();
 };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var none = _.every(collection, function(item) {
      return !iterator ? !item : !iterator(item);
    });

    return !none || false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(to) {
    for (var i = 1; i < arguments.length; i++) {
      var from = arguments[i];
      _.each(from, function(value, key, from) { to[key] = value; });
    }
    return to;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(to) {
    for (var i = 1; i < arguments.length; i++) {
      var from = arguments[i];
      _.each(from, function(value, key, from) {
        !(key in to) ? to[key] = value : null;
      });
    }
    return to;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};

    return function() {
      return cache[arguments[0]] || (cache[arguments[0]] = func.apply(this, arguments));
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    setTimeout(function() { func.apply(func, args) }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arrayCopy = array.slice();

    for (var i = arrayCopy.length - 1; i > 0; i--) {
      var randKey = Math.floor(Math.random() * (i + 1));
      var holder = arrayCopy[i];
      arrayCopy[i] = arrayCopy[randKey];
      arrayCopy[randKey] = holder;
    }

    return arrayCopy;
  };

  /* TODO after full-time job ends and other deliverables are completed */
  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var criterion = function(a, b) {
      return iterator.constructor === String ? a[iterator] > b[iterator] : iterator(a) > iterator(b);
    };
    return collection.sort(criterion);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];

    for (var i = 0; i < arguments.length; i++) {
      var inner = [];
      for (var j = 0; j < arguments.length; j++) { inner.push(arguments[j][i]); }
        zipped.push(inner);
    }

    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];

    _.each(nestedArray, function(item) {
      Array.isArray(item) ? _.flatten(item, result) : result.push(item);
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var set = [];
    var firstArr = arguments[0];
    var numArrs = arguments.length;

    for (var i = 0; i < firstArr.length; i++) {
      var item = firstArr[i];

      // skip iteration if set already contains item
      if (_.contains(set, item)) continue;

      for (var j = 1; j < numArrs; j++) {
        // break out of loop if current array doesn't contain item
        if(!_.contains(arguments[j], item)) break;
      }

      // if all of the arrays contain the item,
      // the loop will have iterated numArrs times
      if (j === numArrs) set.push(item);
    }

    return set;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var diff = [];

    for (var i = 0; i < array.length; i++) {
      if (_.contains(diff, array[i])) continue;

      for (var j = 1; j < arguments.length; j++) {
        if (_.contains(arguments[j], array[i])) break;
      }

      if (j === arguments.length) diff.push(array[i]);
    }

    return diff;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var result;
    var timeout = null;
    var lastCall = 0;

    var forLater = function() {
      lastCall = new Date().getTime();
      timeout = null;
      result = func.apply(null, arguments);
    };

    var throttledFunction = function() {
      var now = new Date().getTime();
      var remaining = wait - (now - lastCall);
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        lastCall = now;
        result = func.apply(null, arguments);
      } else if (!timeout) {
        timeout = setTimeout(forLater, remaining);
      }
      return result;
    };

    return throttledFunction;
  };

}).call(this);
