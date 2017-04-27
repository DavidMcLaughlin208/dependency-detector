# dependency-detector

# Initial idea for solution:

- There will always be a package that has no dependencies; this is necessary to find a solution. (Throw an exception if there isn't one.)

- Identify packages included in the input that have no dependencies. Also, identify packages that are dependencies but are not included as a key.

- Loop through installed packages, finding not yet installed packages that depend on them, and add them to the list. This should continue until all packages are installed.

- Have a check for if we loop through all installed packages and are unable to install any packages. If that is the case we throw an exception since it will be an infinite loop.

- return a string with 

# Pseudocode

FUNCTION(input)
  Turn input into an object literal (package: dependencies)
  FOR VALUES find dependencies not listed as packages, add them as keys with no dependencies
  Remove packages with no dependencies from object and push them to an array storing dependency orders

  WHILE object is not empty
    Boolean to check if infinite loop
    FOR strings in dependency arrays
    find packages in object that depend on current package
    remove those packages from object and push them to array
    throw exception if stuck in infinite loop
  END

  return string of joined dependency array
END

