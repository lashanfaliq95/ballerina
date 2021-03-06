/*
 *  Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package org.ballerinalang.nativeimpl.runtime;

import org.ballerinalang.bre.Context;
import org.ballerinalang.bre.bvm.BLangVMErrors;
import org.ballerinalang.model.values.BRefValueArray;
import org.ballerinalang.model.values.BStruct;
import org.ballerinalang.model.values.BValue;
import org.ballerinalang.natives.AbstractNativeFunction;
import org.ballerinalang.natives.annotations.BallerinaFunction;

/**
 * Native implementation for get current call stack.
 *
 * @since 0.963.0
 */
@BallerinaFunction(
        packageName = "ballerina.runtime",
        functionName = "getErrorCallStack"
)
public class GetErrorCallStack extends AbstractNativeFunction {

    @Override
    public BValue[] execute(Context context) {
        final BStruct errorStruct = (BStruct) getRefArgument(context, 0);
        BRefValueArray callStack = (BRefValueArray) errorStruct.getNativeData(BLangVMErrors.CALL_STACK);
        return new BValue[] {callStack};
    }
}
