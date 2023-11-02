import merge from 'lodash/merge';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * !! 確認用のみ !!
 * @example @log({logInput: true, logOutput: true, logName: true, logClass: true}) || @log()
 */
export const log =
  (
    options: {
      logInput?: boolean;
      logOutput?: boolean;
      logName?: boolean;
      logClass?: boolean;
    } = {
      logInput: true,
      logOutput: true,
      logName: true,
      logClass: true,
    }
  ) =>
  (_target: unknown, _prop: string, descriptor: PropertyDescriptor) => ({
    ...descriptor,
    value: function (...args) {
      const retVal = descriptor.value.apply(this, args);
      if (
        retVal
        // !(InjectorContainerModule.injector?.get(APP_ENV)?.production ?? true)
      ) {
        if (retVal instanceof Observable) {
          return retVal.pipe(
            tap((output) =>
              console.log({
                ...merge(
                  options.logClass && { class: this?.constructor?.name },
                  options.logName && { name: _prop },
                  options.logInput && { input: args },
                  options.logOutput && { output }
                ),
              })
            )
          );
        } else if (retVal instanceof Promise) {
          return retVal.then((output) => {
            console.log({
              ...merge(
                options.logClass && { class: this?.constructor?.name },
                options.logName && { name: _prop },
                options.logInput && { input: args },
                options.logOutput && { output }
              ),
            });
            return output;
          });
        } else {
          console.log({
            ...merge(
              options.logClass && { class: this?.constructor?.name },
              options.logName && { name: _prop },
              options.logInput && { input: args },
              options.logOutput && { output: retVal }
            ),
          });
        }
      }
      return retVal;
    },
  });
