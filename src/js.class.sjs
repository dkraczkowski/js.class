macro class {
  rule {
    $className {
        $($mname $mparams $mbody)...
    }

  } => {
    var $className = JSClass({
        $($mname: function $mname $mparams $mbody,)...
    });
  }

  rule {
    $className extends $parentClassName {
        $($mname $mparams $mbody) ...
    }
  } => {
    var $className = $parentClassName.extend({
        $($mname: function $mname $mparams $mbody,)...
    });
  }

  rule {
    $className implements $mixins... {
        $($mname $mparams $mbody) ...
    }

  } => {
    var $className = JSClass({
        $($mname: function $mname $mparams $mbody,)...
    }).mixin($mixins...);
  }

  rule {
    $className extends $parentClassName implements $mixins... {
        $($mname $mparams $mbody) ...
    }
  } => {
    var $className = $parentClassName.extend({
        $($mname: function $mname $mparams $mbody,)...
    }).mixin($mixins...);
  }

}

operator (is) 14 right { $var, $className } => #{ $var.typeOf($className) }
